import LegalPage, { LegalSection } from '../../components/LegalPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Reembolso | PhoneFarm',
  description: 'Política de reembolso e cancelamento do PhoneFarm.',
};

const sections: LegalSection[] = [
  {
    title: 'Todas as vendas são finais',
    paragraphs: [
      '[DESCREVA O SERVIÇO E QUANDO O ACESSO É DISPONIBILIZADO]. [INFORME A REGRA DE REEMBOLSO APLICÁVEL E EVENTUAIS EXCEÇÕES, EM CONFORMIDADE COM A LEGISLAÇÃO LOCAL].',
      'Esta política aplica-se igualmente a: compras de planos mensais e suas renovações automáticas, recargas de carteira, pacotes adicionais de tempo e taxas de upgrade. Ao confirmar a finalização da compra nesta plataforma, você reconhece expressamente que está adquirindo um serviço digital com entrega imediata e que renuncia a qualquer direito de arrependimento, período de reflexão ou reembolso.',
    ],
  },
  {
    title: 'Renovação e cancelamento automáticos',
    paragraphs: [
      '[DESCREVA COMO FUNCIONAM A RENOVAÇÃO AUTOMÁTICA, OS MEIOS DE PAGAMENTO ACEITOS, A FORMA DE CANCELAMENTO E QUALQUER REGRA PARA ASSINATURAS ANTERIORES A UMA DATA DE CORTE.]',
      'O complemento Automação é vendido em planos com duração de 30 dias, pagos com cartão, diretamente da carteira ou em criptomoedas. Caso a renovação não possa ser paga na data estipulada (saldo insuficiente na carteira ou falta de cartão, ou se o cartão for recusado), o plano não será renovado e será encerrado. Planos pagos em criptomoedas não são renovados automaticamente. Nenhum pagamento em criptomoedas é debitado automaticamente da sua conta: você sempre inicia o pagamento manualmente.',
      'Você pode cancelar a qualquer momento na página de Faturamento, desativando a renovação automática. O cancelamento interrompe todas as renovações futuras e você mantém o acesso até o final do período já pago. O cancelamento não reembolsa o período atual: não há reembolsos totais ou proporcionais em caso de cancelamento. Ao final do período, seus dispositivos serão desativados e excluídos permanentemente 48 horas depois, juntamente com seus aplicativos e dados, a menos que você assine novamente.',
      'Se a renovação automática não puder ser paga (seu saldo na carteira estiver baixo e seu cartão, se houver, for recusado), enviaremos um e-mail e o plano não será renovado: ele termina na data de término e, no caso do plano de celulares, seus celulares serão desativados e excluídos permanentemente 48 horas depois, juntamente com seus aplicativos e dados, a menos que você assine novamente.',
      '[DESCREVA COMO SÃO TRATADAS RENOVAÇÕES NÃO PAGAS, PRAZOS PARA REGULARIZAÇÃO, SUSPENSÃO OU ENCERRAMENTO DO SERVIÇO E EXCLUSÃO DE DADOS.]',
    ],
  },
  {
    title: 'Atualizações de meio de ciclo',
    paragraphs: [
      'Se você fizer um upgrade para um plano superior antes do término do seu período atual, o novo plano será aplicado imediatamente e manterá a data de término atual. Você pagará a diferença entre os dois preços mensais dos planos, cobrada de uma só vez; se mais de um mês do seu período atual for pré-pago, essa diferença mensal será cobrada pelo tempo restante, contado em dias. As renovações subsequentes serão cobradas pelo preço do novo plano. A taxa de upgrade está sujeita à mesma regra de não reembolso que qualquer outro pagamento na plataforma.',
    ],
  },
  {
    title: 'Rebaixamentos no meio do ciclo',
    paragraphs: [
      'A mudança para um plano inferior entra em vigor no próximo ciclo de faturamento. Você mantém os recursos do seu plano atual até o final do período já pago. Não há reembolso em dinheiro pela parte não utilizada do plano superior — o valor total é entregue até o final desse período.',
    ],
  },
  {
    title: 'Complementos de carteira e tempo',
    paragraphs: [
      'Recargas de carteira e pacotes adicionais de tempo não são reembolsáveis após a compra, mesmo que nenhum minuto tenha sido consumido. Saldos não utilizados não expiram e permanecem disponíveis em sua conta enquanto ela estiver ativa, portanto, o valor pago pode ser recuperado sempre que você utilizar o serviço.',
    ],
  },
  {
    title: 'Crédito por interrupção de serviço',
    paragraphs: [
      'Se a plataforma ficar indisponível por mais de 4 horas consecutivas durante o período de vigência do seu plano e você não conseguir acessar seus telefones, terá direito a um crédito proporcional ao tempo de serviço (não um reembolso em dinheiro) que será aplicado à sua próxima compra. Os créditos são emitidos automaticamente quando detectados; entre em contato com o suporte se não os receber após uma interrupção qualificada.',
    ],
  },
  {
    title: 'Estornos e contestações de pagamento',
    paragraphs: [
      'Abrir uma contestação de pagamento ou estorno junto ao seu banco ou emissor do cartão, em vez de entrar em contato primeiro com nossa equipe de suporte, constitui uma violação grave destes termos e resulta em:',
    ],
    bullets: [
      'Suspensão imediata de todos os telefones e serviços em nuvem associados à sua conta.',
      'Encerramento permanente da conta e perda de todo o saldo não utilizado da carteira, minutos adicionais e dados armazenados na plataforma.',
      'Adição do e-mail, endereço IP e impressão digital do dispositivo associados à nossa lista de bloqueio, impedindo futuros cadastros.',
      'Recuperação da taxa de estorno do valor contestado, acrescida das despesas de cobrança, quando aplicável.',
    ],
  },
  {
    title: 'Como entrar em contato com o suporte',
    paragraphs: [
      'Para dúvidas ou solicitações sobre pagamentos, entre em contato com [CANAL DE SUPORTE]. [INFORME O PRAZO DE RESPOSTA E O PROCEDIMENTO PARA SOLICITAÇÕES DE REEMBOLSO].',
      '[DESCREVA QUAIS REGISTROS DE PAGAMENTO E USO SÃO MANTIDOS, POR QUANTO TEMPO E COMO SÃO UTILIZADOS EM CONTESTAÇÕES, EM CONFORMIDADE COM A LEGISLAÇÃO APLICÁVEL].',
    ],
  },
  {
    title: 'Alterações a esta política',
    paragraphs: [
      'Podemos atualizar esta Política de Reembolso. As alterações aplicam-se a cobranças efetuadas após a atualização; a elegibilidade para reembolsos de cobranças anteriores segue sempre a política em vigor no momento da compra. A versão que rege a sua compra é aquela cujo link encontra na página de finalização da compra no dia do pagamento.',
    ],
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      title="Política de Reembolso"
      updated="[DATA DA ÚLTIMA ATUALIZAÇÃO]"
      notice={{
        title: 'Não há reembolso. Todas as vendas são finais.',
        text: 'Preencha esta seção com sua política de reembolso, incluindo condições, prazos e exceções. Verifique a conformidade com a legislação aplicável antes de publicar.',
      }}
      intro={[
        'Esta política rege os reembolsos de [TIPOS DE PRODUTOS E SERVIÇOS] oferecidos por [NOME DO SERVIÇO]. Ao efetuar um pagamento, consulte as condições descritas nesta política e as informações apresentadas na finalização da compra.',
        'Os pagamentos são processados por [NOME LEGAL DA EMPRESA], constituída em [ESTADO/PAÍS], com sede em [ENDEREÇO COMPLETO]. As cobranças aparecerão no extrato como [DESCRITOR DA COBRANÇA].',
      ]}
      sections={sections}
    />
  );
}
