export function getMagicLinkEmail(url: string): string {
  return `
    <mjml>
      <mj-head>
        <mj-title>Magic Link 로그인</mj-title>
        <mj-preview>로그인을 위해 아래 버튼을 눌러주세요.</mj-preview>
        <mj-attributes>
          <mj-all font-family="Arial, sans-serif" />
          <mj-button background-color="#00DC82" color="#ffffff" font-size="16px" padding="15px 30px" border-radius="8px" font-weight="bold" />
          <mj-text font-size="14px" color="#555555" />
        </mj-attributes>
      </mj-head>

      <mj-body background-color="#f3f4f6">
        <mj-section padding="20px 0">
          <mj-column width="100%">
            <mj-text align="center" font-size="20px" font-weight="bold" color="#111827">🔗 Magic Link 로그인</mj-text>
            <mj-text align="center">아래 버튼을 클릭하여 로그인하세요:</mj-text>
          </mj-column>
        </mj-section>

        <mj-section>
          <mj-column>
            <mj-button href="${url}" align="center">
              로그인하기 →
            </mj-button>
          </mj-column>
        </mj-section>

        <mj-section padding-top="20px">
          <mj-column>
            <mj-text align="center" font-size="12px" color="#6b7280">
              버튼이 작동하지 않으면 아래 링크를 복사하여 브라우저에 붙여넣으세요.
            </mj-text>
            <mj-text align="center" font-size="12px" color="#00DC82" word-break="break-all">
              <a href="${url}" style="color: #00DC82;">${url}</a>
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `
}
