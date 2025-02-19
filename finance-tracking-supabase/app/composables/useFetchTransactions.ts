export const useFetchTransactions = (period: any) => {
  const supabase = useSupabaseClient()
  const transactions = ref<any[]>([])
  const pending = ref(false)
  const income = computed(
    () => {
      return transactions.value.filter(t => t.type === 'Income')
    }
  )
  const expense = computed(
    () => {
      return transactions.value.filter(t => t.type === 'Expense')
    }
  )
  const incomeCount = computed(() => income.value.length)
  const expenseCount = computed(() => expense.value.length)
  const incomeTotal = computed(
    () => income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  )
  const expenseTotal = computed(
    () => expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  )
  
  // wrapper in block
  const fetchTransactions = async () => {
    pending.value = true
    try {
      const { data } = useAsyncData(`transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`, async () => {
        const { data, error } = await supabase
          .from('transactions')
          .select()
          .gte('created_at', period.value.from.toISOString())
          .lte('created_at', period.value.to.toISOString())
          .order('created_at', { ascending: false })
        if (error) return []
        return data
      })
      return data.value
    } finally {
      pending.value = false
    }
  }
  const refresh = async () => transactions.value = await fetchTransactions() ?? []

  watch(period, async () => await refresh())
  
  const transactionsGroupedByDate = computed(() => {
    let grouped = {} as any
    for (const transaction of transactions.value) {
      const date = new Date(transaction.created_at).toISOString().split('T')[0]
      if (!grouped[date as any]) {
        grouped[date as any] = []
      }
      grouped[date as any].push(transaction)
    }
    return grouped
  })
  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount
    },
    refresh,
    pending
  }
}