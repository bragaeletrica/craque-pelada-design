"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, User, Activity, Dumbbell, BookOpen, 
  Calendar, Users, Bell, TrendingUp, MessageCircle,
  Trophy, Target, Flame, Clock, Award, ChevronRight,
  Play, Zap, Heart, BarChart3, Menu, X, LogOut
} from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { useGameDiary } from "./hooks/useGameDiary";
import { useWorkouts, useWarmupRoutines } from "./hooks/useWorkouts";
import { signOut } from "@/lib/auth";

type Screen = 
  | "dashboard" 
  | "profile" 
  | "risk-assessment" 
  | "warmup" 
  | "training" 
  | "diary" 
  | "community" 
  | "insights" 
  | "qa";

export default function CraqueDaPelada() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-8 h-8 text-[#0D0D0D]" />
          </div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Perfil", icon: User },
    { id: "risk-assessment", label: "Avaliação", icon: Activity },
    { id: "warmup", label: "Aquecimento", icon: Zap },
    { id: "training", label: "Treinos", icon: Dumbbell },
    { id: "diary", label: "Diário", icon: Calendar },
    { id: "community", label: "Comunidade", icon: Users },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "qa", label: "Q&A", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#00FF00]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-inter">
                Craque da <span className="text-[#00FF00]">Pelada</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right mr-2">
                <p className="text-sm font-medium">{profile?.full_name || "Jogador"}</p>
                <p className="text-xs text-gray-400">Nível {profile?.level || 1}</p>
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
              
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00FF00] rounded-full"></span>
              </button>
              
              <button 
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed top-16 left-0 right-0 bg-[#0D0D0D] border-b border-[#00FF00]/10 p-4">
            <nav className="grid grid-cols-2 gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentScreen(item.id as Screen);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      currentScreen === item.id
                        ? "bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/20"
                        : "hover:bg-white/5 text-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="flex pt-16">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-[#0D0D0D] border-r border-[#00FF00]/10 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    currentScreen === item.id
                      ? "bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/20 shadow-lg shadow-[#00FF00]/5"
                      : "hover:bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          {currentScreen === "dashboard" && <Dashboard profile={profile} />}
          {currentScreen === "profile" && <Profile profile={profile} />}
          {currentScreen === "risk-assessment" && <RiskAssessment />}
          {currentScreen === "warmup" && <Warmup />}
          {currentScreen === "training" && <Training />}
          {currentScreen === "diary" && <Diary userId={user?.id} />}
          {currentScreen === "community" && <Community />}
          {currentScreen === "insights" && <Insights profile={profile} />}
          {currentScreen === "qa" && <QA />}
        </main>
      </div>
    </div>
  );
}

function Dashboard({ profile }: { profile: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h2>
        <p className="text-gray-400">Visão geral do seu desempenho</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Flame} 
          label="Jogos" 
          value={profile?.total_games || 0} 
          trend={`${profile?.total_wins || 0} vitórias`}
          color="text-[#00FF00]"
        />
        <StatCard 
          icon={Trophy} 
          label="Gols" 
          value={profile?.total_goals || 0} 
          trend={`${profile?.total_assists || 0} assistências`}
          color="text-[#00FF00]"
        />
        <StatCard 
          icon={Target} 
          label="Avaliação" 
          value={profile?.rating?.toFixed(1) || "0.0"} 
          trend="Média geral"
          color="text-[#00FF00]"
        />
        <StatCard 
          icon={Award} 
          label="Conquistas" 
          value={profile?.badges || 0} 
          trend={`Nível ${profile?.level || 1}`}
          color="text-[#00FF00]"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard
          icon={Play}
          title="Iniciar Aquecimento"
          description="Prepare-se para o jogo"
          color="from-[#00FF00] to-[#00CC00]"
        />
        <QuickActionCard
          icon={Dumbbell}
          title="Treino do Dia"
          description="Exercícios personalizados"
          color="from-[#00FF00] to-[#00CC00]"
        />
        <QuickActionCard
          icon={Activity}
          title="Avaliar Risco"
          description="Previna lesões"
          color="from-[#00FF00] to-[#00CC00]"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Atividade Recente</h3>
          <button className="text-[#00FF00] hover:text-[#00CC00] transition-colors text-sm font-medium flex items-center gap-1">
            Ver tudo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          <ActivityItem 
            icon={Trophy}
            title="Bem-vindo ao Craque da Pelada!"
            description="Complete seu perfil para começar"
            time="Agora"
          />
          <ActivityItem 
            icon={Target}
            title="Defina suas metas"
            description="Configure seus objetivos semanais"
            time="Pendente"
          />
        </div>
      </div>
    </div>
  );
}

function Profile({ profile }: { profile: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Perfil</h2>
        <p className="text-gray-400">Suas informações e estatísticas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-[#0D0D0D]" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{profile?.full_name || "Jogador"}</h3>
            <p className="text-gray-400 mb-4">@{profile?.username || "usuario"}</p>
            <div className="flex gap-2 mb-6">
              <span className="px-3 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded-full text-sm border border-[#00FF00]/20">
                Nível {profile?.level || 1}
              </span>
              {profile?.is_premium && (
                <span className="px-3 py-1 bg-[#00FF00]/10 text-[#00FF00] rounded-full text-sm border border-[#00FF00]/20">
                  Premium
                </span>
              )}
            </div>
            <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Estatísticas Gerais</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.total_games || 0}</div>
                <div className="text-sm text-gray-400">Jogos</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.total_wins || 0}</div>
                <div className="text-sm text-gray-400">Vitórias</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.total_goals || 0}</div>
                <div className="text-sm text-gray-400">Gols</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.total_assists || 0}</div>
                <div className="text-sm text-gray-400">Assistências</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.rating?.toFixed(1) || "0.0"}</div>
                <div className="text-sm text-gray-400">Avaliação</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-3xl font-bold text-[#00FF00] mb-1">{profile?.badges || 0}</div>
                <div className="text-sm text-gray-400">Badges</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Conquistas Recentes</h3>
            <div className="text-center py-8 text-gray-400">
              <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Jogue mais para desbloquear conquistas!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskAssessment() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Avaliação de Risco</h2>
        <p className="text-gray-400">Previna lesões e jogue com segurança</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#00FF00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Avaliação Rápida</h3>
              <p className="text-sm text-gray-400">5 minutos</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Responda perguntas básicas sobre sua condição física atual e histórico de lesões.
          </p>
          <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300">
            Iniciar Avaliação
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#00FF00]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Avaliação Completa</h3>
              <p className="text-sm text-gray-400">15 minutos</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6">
            Análise detalhada com testes de mobilidade, força e flexibilidade para um diagnóstico preciso.
          </p>
          <button className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
            Iniciar Avaliação
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold mb-4">Seu Status Atual</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Risco de Lesão</span>
              <span className="text-sm text-[#00FF00]">Baixo</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Condição Física</span>
              <span className="text-sm text-[#00FF00]">Ótima</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Recuperação</span>
              <span className="text-sm text-[#00FF00]">Completa</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Warmup() {
  const { routines, loading } = useWarmupRoutines();

  const warmupRoutines = routines.filter(r => r.routine_type === 'warmup');
  const cooldownRoutines = routines.filter(r => r.routine_type === 'cooldown');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Aquecimento</h2>
        <p className="text-gray-400">Prepare seu corpo para o jogo</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-[#00FF00] border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warmupRoutines.map((routine) => (
              <div key={routine.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#00FF00]/30 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center group-hover:bg-[#00FF00]/20 transition-all duration-300">
                    <Zap className="w-6 h-6 text-[#00FF00]" />
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs capitalize">{routine.difficulty}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{routine.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {routine.duration} min
                  </span>
                  <span>{routine.exercises_count} exercícios</span>
                </div>
                <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-2 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Iniciar
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold mb-4">Alongamento Pós-Treino</h3>
            <p className="text-gray-400 mb-4">Recupere-se adequadamente após o jogo</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cooldownRoutines.map((routine) => (
                <div key={routine.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                  <div className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{routine.title}</div>
                    <div className="text-xs text-gray-400">{routine.duration} minutos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Training() {
  const { workouts, loading } = useWorkouts();

  const categories = [
    { name: "Resistência", icon: Flame, type: "resistance" },
    { name: "Velocidade", icon: Zap, type: "speed" },
    { name: "Técnica", icon: Target, type: "technique" },
    { name: "Força", icon: Dumbbell, type: "strength" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Biblioteca de Treinos</h2>
        <p className="text-gray-400">Exercícios personalizados para você</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = workouts.filter(w => w.category === category.type).length;
          return (
            <div key={category.type} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#00FF00]/30 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00FF00]/20 transition-all duration-300">
                <Icon className="w-6 h-6 text-[#00FF00]" />
              </div>
              <h3 className="font-bold mb-1">{category.name}</h3>
              <p className="text-sm text-gray-400">{count} treinos</p>
            </div>
          );
        })}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-[#00FF00] border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h3 className="text-xl font-bold mb-4">Treinos Recomendados</h3>
          <div className="space-y-3">
            {workouts.slice(0, 6).map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center group-hover:bg-[#00FF00]/20 transition-all duration-300">
                    <Dumbbell className="w-5 h-5 text-[#00FF00]" />
                  </div>
                  <div>
                    <div className="font-bold">{workout.title}</div>
                    <div className="text-sm text-gray-400">{workout.duration} min • {workout.difficulty}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#00FF00] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Diary({ userId }: { userId: string | undefined }) {
  const { games, loading } = useGameDiary(userId);

  const getResultText = (result: string, scoreUser: number, scoreOpponent: number) => {
    if (result === 'win') return `Vitória ${scoreUser}-${scoreOpponent}`;
    if (result === 'loss') return `Derrota ${scoreUser}-${scoreOpponent}`;
    return `Empate ${scoreUser}-${scoreOpponent}`;
  };

  const getResultColor = (result: string) => {
    if (result === 'win') return 'text-[#00FF00]';
    if (result === 'loss') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Diário do Jogador</h2>
        <p className="text-gray-400">Registre seus jogos e evolução</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300 flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          Registrar Novo Jogo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-[#00FF00] border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : games.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-12 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Nenhum jogo registrado ainda</p>
          <p className="text-sm text-gray-500 mt-2">Comece a registrar seus jogos para acompanhar sua evolução!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#00FF00]/30 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">
                    {new Date(game.game_date).toLocaleDateString('pt-BR')}
                  </div>
                  <h3 className="text-xl font-bold mb-1">vs {game.opponent_name}</h3>
                  <div className={`font-bold ${getResultColor(game.result)}`}>
                    {getResultText(game.result, game.score_user, game.score_opponent)}
                  </div>
                </div>
                <Trophy className="w-8 h-8 text-[#00FF00]" />
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Gols:</span>
                  <span className="ml-2 font-bold">{game.goals}</span>
                </div>
                <div>
                  <span className="text-gray-400">Assistências:</span>
                  <span className="ml-2 font-bold">{game.assists}</span>
                </div>
                {game.rating && (
                  <div>
                    <span className="text-gray-400">Nota:</span>
                    <span className="ml-2 font-bold text-[#00FF00]">{game.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Community() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Comunidade</h2>
        <p className="text-gray-400">Conecte-se com outros jogadores</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-3xl font-bold text-[#00FF00] mb-1">0</div>
          <div className="text-sm text-gray-400">Seguidores</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-3xl font-bold text-[#00FF00] mb-1">0</div>
          <div className="text-sm text-gray-400">Seguindo</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center">
          <div className="text-3xl font-bold text-[#00FF00] mb-1">0</div>
          <div className="text-sm text-gray-400">Grupos</div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold mb-4">Feed da Comunidade</h3>
        <div className="text-center py-12 text-gray-400">
          <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Nenhuma atividade ainda</p>
          <p className="text-sm mt-2">Comece a seguir outros jogadores para ver suas atividades!</p>
        </div>
      </div>
    </div>
  );
}

function Insights({ profile }: { profile: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Insights e Gráficos</h2>
        <p className="text-gray-400">Acompanhe sua evolução</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Desempenho Semanal</h3>
            <BarChart3 className="w-6 h-6 text-[#00FF00]" />
          </div>
          <div className="space-y-3">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-8">{day}</span>
                <div className="flex-1 bg-white/10 rounded-full h-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-full rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  >
                    <span className="text-xs font-bold text-[#0D0D0D]">
                      {Math.floor(Math.random() * 60 + 40)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Evolução Mensal</h3>
            <TrendingUp className="w-6 h-6 text-[#00FF00]" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Gols</span>
                <span className="text-sm text-[#00FF00]">+15%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Assistências</span>
                <span className="text-sm text-[#00FF00]">+22%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Condição Física</span>
                <span className="text-sm text-[#00FF00]">+18%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#00FF00] to-[#00CC00] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold mb-4">Análise Detalhada</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#00FF00] mb-1">
              {profile?.rating?.toFixed(1) || "0.0"}
            </div>
            <div className="text-sm text-gray-400">Média de Nota</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#00FF00] mb-1">
              {profile?.total_wins && profile?.total_games 
                ? Math.round((profile.total_wins / profile.total_games) * 100) 
                : 0}%
            </div>
            <div className="text-sm text-gray-400">Taxa de Vitória</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#00FF00] mb-1">
              {profile?.total_games > 0 
                ? (profile.total_goals / profile.total_games).toFixed(1) 
                : "0.0"}
            </div>
            <div className="text-sm text-gray-400">Gols/Jogo</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-bold text-[#00FF00] mb-1">
              {profile?.total_games > 0 
                ? (profile.total_assists / profile.total_games).toFixed(1) 
                : "0.0"}
            </div>
            <div className="text-sm text-gray-400">Assist./Jogo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QA() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">Q&A com Especialista</h2>
        <p className="text-gray-400">Tire suas dúvidas sobre treino e performance</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#00FF00] to-[#00CC00] rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-[#0D0D0D]" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Especialista Online</h3>
            <p className="text-sm text-[#00FF00]">● Disponível agora</p>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-[#00FF00] to-[#00CC00] text-[#0D0D0D] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#00FF00]/20 transition-all duration-300">
          Iniciar Conversa
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold mb-4">Perguntas Frequentes</h3>
        <div className="space-y-3">
          {[
            "Como melhorar minha velocidade?",
            "Qual a melhor forma de prevenir lesões?",
            "Como aumentar minha resistência?",
            "Dicas para melhorar o controle de bola",
          ].map((question, index) => (
            <button key={index} className="w-full text-left p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-between group">
              <span>{question}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#00FF00] transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#00FF00]/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-[#00FF00]/10 rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full">{trend}</span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, description, color }: any) {
  return (
    <button className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-[#00FF00]/30 transition-all duration-300 text-left group">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-[#0D0D0D]" />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </button>
  );
}

function ActivityItem({ icon: Icon, title, description, time }: any) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
      <div className="w-10 h-10 bg-[#00FF00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#00FF00]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm mb-1">{title}</div>
        <div className="text-xs text-gray-400 mb-1">{description}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>
    </div>
  );
}
