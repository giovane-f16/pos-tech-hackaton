import { GraduationCap, Users, Shield, Brain } from "lucide-react";

export default function Home() {
  return (
    <main className="flex bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black">
         <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="mb-4 flex items-center justify-center gap-2">
            <GraduationCap className="size-12 text-blue-600" />
            <span className="text-4xl font-bold dark:text-white">EduPlataforma</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Plataforma educacional inteligente para envio de trabalhos acadêmicos e auxílio com IA
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                    <h4 className="flex items-center gap-2 leading-none dark:text-white">
                        <Users className="size-6 text-blue-600" />
                        Para Alunos
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-muted-foreground">
                        Envie seus trabalhos e obtenha auxílio de IA
                    </p>
                </div>
            <div className="px-6 [&:last-child]:pb-6">
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ Envio fácil de trabalhos acadêmicos</li>
                <li>✓ Histórico completo de envios</li>
                <li>✓ Assistente de IA para auxílio nos trabalhos</li>
                <li>✓ Acompanhamento de avaliações</li>
              </ul>
            </div>
            </div>
            <div className="bg-white dark:bg-gray-800 text-card-foreground flex flex-col gap-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                    <h4 className="flex items-center gap-2 leading-none dark:text-white">
                        <Shield className="size-6 text-green-600" />
                        Para Professores
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-muted-foreground">
                        Avalie trabalhos com análise de IA
                    </p>
                </div>
            <div className="px-6 [&:last-child]:pb-6">
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>✓ Avaliação eficiente de trabalhos</li>
                <li>✓ Histórico de avaliações</li>
                <li>✓ Análise de uso de IA nos trabalhos</li>
                <li>✓ Detecção de porcentagem de IA utilizada</li>
              </ul>
            </div>
            </div>
        </div>

        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-lg p-8 mb-16">
          <h2 className="text-center mb-8 text-2xl">Por que usar a EduPlataforma?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Brain className="size-12 mx-auto mb-4" />
              <h3 className="mb-2 font-bold">IA Avançada</h3>
              <p className="text-blue-100 dark:text-blue-200">
                Tecnologia de ponta para auxiliar alunos e detectar uso de IA
              </p>
            </div>
            <div className="text-center">
              <GraduationCap className="size-12 mx-auto mb-4" />
              <h3 className="mb-2 font-bold">Foco Educacional</h3>
              <p className="text-blue-100 dark:text-blue-200">
                Desenvolvido especificamente para o ambiente acadêmico
              </p>
            </div>
            <div className="text-center">
              <Shield className="size-12 mx-auto mb-4" />
              <h3 className="mb-2 font-bold">Seguro e Confiável</h3>
              <p className="text-blue-100 dark:text-blue-200">
                Seus trabalhos e dados protegidos com segurança máxima
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-4 font-bold dark:text-white">Pronto para começar?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Crie sua conta e comece a usar a plataforma hoje mesmo
          </p>
          <a href="/auth">
            <button className="text-lg px-8 py-3 bg-black dark:bg-blue-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-400 transition cursor-pointer">
                Criar Conta / Fazer Login
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
