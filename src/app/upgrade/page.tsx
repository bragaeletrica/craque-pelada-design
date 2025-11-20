'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Check, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import stripe from '@/lib/stripe';

type Plan = 'monthly' | 'annual';

const plans = {
  monthly: {
    name: 'Premium Mensal',
    price: 999, // R$ 9,99
    priceDisplay: 'R$ 9,99',
    period: 'mês',
    features: [
      'Treinos ilimitados',
      'Avaliações de risco avançadas',
      'Insights detalhados',
      'Suporte prioritário',
      'Comunidade premium'
    ]
  },
  annual: {
    name: 'Premium Anual',
    price: 9990, // R$ 99,90
    priceDisplay: 'R$ 99,90',
    period: 'ano',
    features: [
      'Tudo do plano mensal',
      '2 meses grátis',
      'Relatórios avançados',
      'Consultoria personalizada',
      'Acesso antecipado a novos recursos'
    ]
  }
};

export default function UpgradePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription, loading } = useSubscription(user?.id);
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleUpgrade = async (plan: Plan) => {
    if (!user) return;

    setLoadingCheckout(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          userId: user.id,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Crown className="w-8 h-8 text-[#0D0D0D]" />
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (subscription?.plan !== 'free') {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white p-4">
        <div className="max-w-2xl mx-auto text-center py-12">
          <Crown className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Você já é Premium!</h1>
          <p className="text-gray-400 mb-8">
            Você possui o plano {subscription?.plan === 'monthly' ? 'Premium Mensal' : 'Premium Anual'}.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
            <Crown className="w-16 h-16 text-[#00FF00] mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Upgrade para Premium</h1>
            <p className="text-gray-400 text-lg">
              Desbloqueie todo o potencial do Craque da Pelada
            </p>
          </div>

          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(Object.keys(plans) as Plan[]).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = selectedPlan === planKey;

              return (
                <div
                  key={planKey}
                  onClick={() => setSelectedPlan(planKey)}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-[#00FF00] bg-[#00FF00]/5'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {isSelected && <Check className="w-6 h-6 text-[#00FF00]" />}
                  </div>

                  <div className="mb-4">
                    <div className="text-3xl font-bold text-[#00FF00]">{plan.priceDisplay}</div>
                    <div className="text-sm text-gray-400">por {plan.period}</div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#00FF00] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => handleUpgrade(selectedPlan)}
              disabled={loadingCheckout}
              className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 px-12 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingCheckout ? 'Processando...' : `Assinar ${plans[selectedPlan].name}`}
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Cancele a qualquer momento • Pagamento seguro via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}