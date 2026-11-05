import LegalPage, { LegalSection } from '../../components/LegalPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | PhoneFarm',
  description: 'Saiba como o PhoneFarm coleta, usa e protege dados pessoais.',
};

const sections: LegalSection[] = [
  {
    title: 'Dados que coletamos',
    paragraphs: [
      'Coletamos os dados mínimos necessários para operar o serviço: [DESCREVA OS DADOS DA CONTA], [DADOS DE FATURAMENTO E PROCESSADOR DE PAGAMENTO], [DADOS DE USO DO PRODUTO] e [METADADOS TÉCNICOS COLETADOS].',
    ],
  },
  {
    title: 'Como utilizamos seus dados',
    paragraphs: ['Utilizamos seus dados estritamente para:'],
    bullets: [
      'Autenticar sua conta e manter sua sessão segura.',
      'Provisionar, executar e faturar telefones e complementos na nuvem.',
      'Enviar e-mails transacionais (convites, recibos, alertas de segurança).',
      'Detectar fraudes e abusos na plataforma.',
      'Melhorar a confiabilidade do produto por meio de métricas agregadas e anonimizadas.',
    ],
  },
  {
    title: 'Processadores terceirizados',
    paragraphs: [
      'Os fornecedores que processam dados em nosso nome, de acordo com os contratos aplicáveis, são:',
    ],
    bullets: [
      '[PROVEDOR DE AUTENTICAÇÃO, BANCO DE DADOS E ARMAZENAMENTO] ([SERVIÇOS PRESTADOS]).',
      '[PROCESSADOR DE PAGAMENTOS] (processamento de pagamentos e faturamento).',
      '[PROVEDOR DE INFRAESTRUTURA DE DISPOSITIVOS] (provisionamento de dispositivos).',
      '[PROVEDOR DE E-MAIL] (notificações da conta).',
    ],
  },
  {
    title: 'Retenção de dados',
    paragraphs: [
      'Os dados da conta são mantidos enquanto a sua conta estiver ativa. Após a exclusão, os dados pessoais são apagados em até 30 dias, exceto aqueles que somos legalmente obrigados a reter (registros de faturamento por até 7 anos). Os registros de atividades com mais de 90 dias são anonimizados.',
    ],
  },
  {
    title: 'Seus direitos',
    paragraphs: [
      'Você pode solicitar acesso, retificação, exclusão ou exportação de seus dados pessoais a qualquer momento, entrando em contato conosco pelo canal de suporte disponível na página inicial. Responderemos em até 30 dias.',
    ],
  },
  {
    title: 'Cookies',
    paragraphs: [
      '[DESCREVA OS COOKIES E TECNOLOGIAS DE RASTREAMENTO UTILIZADOS, SUAS FINALIDADES E COMO O USUÁRIO PODE GERENCIAR SUAS PREFERÊNCIAS.]',
    ],
  },
  {
    title: 'Segurança',
    paragraphs: [
      'Os dados são criptografados em trânsito (TLS 1.3) e em repouso. As senhas são criptografadas com algoritmos modernos. O acesso aos bancos de dados de produção é restrito e auditado. Caso ocorra uma violação que afete seus dados pessoais, notificaremos os usuários afetados em até 72 horas.',
    ],
  },
  {
    title: 'Alterações a esta política',
    paragraphs: [
      'Podemos atualizar esta Política de Privacidade. Alterações significativas serão comunicadas por e-mail e/ou por meio de um aviso no painel de controle com pelo menos 14 dias de antecedência à sua entrada em vigor.',
    ],
  },
  {
    title: 'Contato',
    paragraphs: [
      'Para questões relacionadas à privacidade, entre em contato conosco através do link de contato em nossa página inicial.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      updated="[DATA DA ÚLTIMA ATUALIZAÇÃO]"
      intro={[
        'Esta Política de Privacidade explica como [NOME DO SERVIÇO] (“nós”, “nos”) coleta, usa e protege os dados pessoais dos usuários (“você”) que acessam nossa plataforma. Ao usar o serviço, você concorda com os termos abaixo.',
        'O controlador de dados é [NOME LEGAL DA EMPRESA], constituída em [ESTADO/PAÍS], com sede em [ENDEREÇO COMPLETO]. Para questões de privacidade, entre em contato por [E-MAIL OU CANAL DE CONTATO].',
        'Não vendemos, alugamos ou compartilhamos seus dados com anunciantes.',
      ]}
      sections={sections}
    />
  );
}
