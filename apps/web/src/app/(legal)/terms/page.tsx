import LegalPage, { LegalSection } from '../../components/LegalPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso | PhoneFarm',
  description: 'Termos de Uso do serviço PhoneFarm.',
};

const sections: LegalSection[] = [
  {
    title: 'Elegibilidade',
    paragraphs: [
      'Você deve ter pelo menos 18 anos de idade e capacidade legal para celebrar um contrato em sua jurisdição. O uso do Serviço em nome de uma empresa vincula essa empresa a estes termos.',
    ],
  },
  {
    title: 'Conta',
    paragraphs: [
      'Você é responsável pelas credenciais que escolher e por toda a atividade em sua conta. Compartilhe o acesso somente através da seção “Membros” — nunca compartilhe senhas.',
      'Podemos suspender ou encerrar contas que violem estes termos, abusem do Serviço, não efetuem pagamentos ou apresentem risco excessivo na plataforma (estornos, sinais de fraude).',
    ],
  },
  {
    title: 'Uso aceitável',
    paragraphs: ['Você concorda em não usar o Serviço para:'],
    bullets: [
      'Envolver-se em atividades ilegais ou violar os direitos de terceiros.',
      'Enviar mensagens em massa não solicitadas, spam, phishing ou malware.',
      'Atacar, examinar ou tentar comprometer qualquer sistema ou usuário.',
      'Revender acesso bruto ao dispositivo fora da sua organização sem consentimento por escrito.',
      'Violar os termos de uso dos aplicativos que você usa em seus celulares na nuvem (TikTok, Instagram, Facebook etc.) de maneiras que nos exponham a responsabilidade legal.',
    ],
  },
  {
    title: 'Assinatura e faturamento',
    paragraphs: [
      'Os planos são cobrados antecipadamente. Um plano de celular ou o complemento Automação pode ser pago com cartão, com o saldo da sua carteira (recarregada com cartão ou criptomoeda) ou em criptomoeda; o complemento Automação é vendido a cada 30 dias por pagamento.',
      'Com a renovação automática ativada (padrão), um plano é renovado automaticamente a cada 30 dias pelo preço atual até que você desative a renovação automática: o preço é debitado do saldo da sua carteira e, para um plano pago com cartão com renovação automática ativada, o valor restante na carteira é cobrado no cartão. Se uma renovação não puder ser paga na data, o plano não será renovado e será encerrado.',
      'Com a renovação automática desativada, o pagamento cobre os dias pagos e nada mais será cobrado. Um plano pago em criptomoeda não é renovado automaticamente; você pode ativar a renovação automática na carteira, na página de Faturamento. Nenhum pagamento em criptomoeda é debitado automaticamente: você sempre inicia o pagamento manualmente.',
      'Assinaturas com cartão iniciadas antes de [DATA DE CORTE] continuam sendo renovadas mensalmente no mesmo cartão via [PROCESSADOR DE PAGAMENTOS] até que você cancele.',
      'Você pode cancelar a qualquer momento na página de Faturamento, desativando a renovação automática. O cancelamento interrompe as renovações futuras; você mantém o acesso até o final do período já pago, e esse período não será reembolsado.',
      'O uso que exceder seus minutos bônus será cobrado pela tarifa por minuto exibida na página de Faturamento, com um limite diário por telefone. Você pode fazer upgrade ou downgrade a qualquer momento; os downgrades entrarão em vigor no próximo ciclo de faturamento.',
      'Se a renovação automática não puder ser paga (seu saldo estiver baixo e seu cartão, se houver, for recusado), enviaremos um e-mail e o plano não será renovado: ele termina na data de término. Para o plano de telefones, seus telefones serão desativados e excluídos permanentemente 48 horas depois, juntamente com seus aplicativos e dados, a menos que você assine novamente; o complemento de Automação simplesmente termina.',
      'Para assinaturas iniciadas antes de [DATA DE CORTE], [DESCREVA COMO SÃO TRATADAS AS RENOVAÇÕES NÃO PAGAS, OS PRAZOS PARA REGULARIZAÇÃO E O QUE ACONTECE COM OS SERVIÇOS E DADOS].',
      'Os pagamentos são finais e não reembolsáveis. Consulte nossa Política de Reembolso para obter detalhes.',
    ],
  },
  {
    title: 'Disponibilidade do serviço',
    paragraphs: [
      'Nosso objetivo é manter um tempo de atividade mensal de 99,9%, mas não garantimos serviço ininterrupto. Manutenções programadas são anunciadas com antecedência sempre que possível. Não nos responsabilizamos por perdas causadas por indisponibilidade temporária, restrições de plataformas de terceiros ou eventos de força maior.',
    ],
  },
  {
    title: 'Propriedade',
    paragraphs: [
      'O Serviço, seu código, interface do usuário, marcas registradas e documentação permanecem de nossa propriedade. O conteúdo que você cria em telefones na nuvem (publicações, mídia, dados) permanece seu — você nos concede uma licença limitada para hospedá-lo e processá-lo apenas para operar o Serviço.',
    ],
  },
  {
    title: 'Isenções de responsabilidade',
    paragraphs: [
      'O Serviço é fornecido “tal como está”, sem garantias de qualquer tipo, expressas ou implícitas. Excluímos as garantias de comercialização, adequação a uma finalidade específica e não violação de direitos, na máxima extensão permitida por lei.',
    ],
  },
  {
    title: 'Limitação de responsabilidade',
    paragraphs: [
      'Na máxima extensão permitida por lei, nossa responsabilidade total por qualquer reclamação decorrente ou relacionada ao Serviço está limitada ao valor que você nos pagou durante os 3 meses anteriores ao evento que deu origem à reclamação. Não nos responsabilizamos por danos indiretos, incidentais, especiais ou consequenciais (lucros cessantes, perda de clientes, danos à reputação).',
    ],
  },
  {
    title: 'Encerramento da conta',
    paragraphs: [
      'Você pode cancelar sua assinatura a qualquer momento na página de Faturamento. O cancelamento interrompe as renovações futuras; o Serviço continua até o final do período já pago. Após essa data, desativamos os telefones na nuvem e suspendemos as automações, e 48 horas depois, os telefones são excluídos permanentemente, juntamente com seus aplicativos e dados, a menos que você assine novamente. Ao encerrar sua conta, também excluímos seus dados pessoais, conforme descrito na Política de Privacidade.',
    ],
  },
  {
    title: 'Alterações',
    paragraphs: [
      'Podemos atualizar estes Termos de Uso. Alterações substanciais serão comunicadas com pelo menos 14 dias de antecedência por e-mail ou banner no painel de controle. O uso continuado após a data de entrada em vigor das alterações será considerado como aceitação.',
    ],
  },
  {
    title: 'Lei aplicável',
    paragraphs: [
      'Estes termos são regidos pelas leis de [ESTADO/PAÍS E JURISDIÇÃO]. Quaisquer disputas serão resolvidas nos tribunais de [CIDADE/ESTADO/PAÍS], a menos que uma lei de proteção ao consumidor obrigatória determine o contrário.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      updated="[DATA DA ÚLTIMA ATUALIZAÇÃO]"
      intro={[
        'Estes Termos de Uso regem seu acesso e uso de [NOME DO SERVIÇO] (“o Serviço”). Ao criar uma conta ou usar o Serviço, você concorda com estes termos.',
        '[NOME LEGAL DA EMPRESA], constituída em [ESTADO/PAÍS], com sede em [ENDEREÇO COMPLETO], opera o Serviço e é a parte contratante para todos os pagamentos feitos por meio de [NOME DO SERVIÇO].',
        'Você é o único responsável pelo conteúdo que publica por meio de telefones em nuvem e por cumprir os termos das plataformas de destino.',
      ]}
      sections={sections}
    />
  );
}
