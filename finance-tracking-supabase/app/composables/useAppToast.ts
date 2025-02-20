export const useAppToast = () => {
  const toast = useToast()
  return {
    toastSuccess: ({ title, description }: { title: string, description?: any }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-check-circle',
        color: 'green'
      })
    },
    toastError: ({ title, description }: { title: string, description?: any }) => {
      toast.add({
        title,
        description,
        icon: 'i-heroicons-exclamation-circle',
        color: 'red'
      })
    }
  }
}