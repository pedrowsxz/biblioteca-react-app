import {
  CalendarDays,
  Clock3,
  MapPin,
  Mail,
  BookOpen,
  PencilLine,
  MessagesSquare,
} from "lucide-react";

export const navItems = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Eventos", path: "/eventos" },
  { label: "Horários", path: "/horarios" },
  { label: "Localização", path: "/localizacao" },
  { label: "Contato", path: "/contato" },
];

export const quickCards = [
  {
    icon: Clock3,
    title: "Horários",
    text: "Consulte nossos horários de funcionamento.",
  },
  {
    icon: MapPin,
    title: "Localização",
    text: "Encontre a biblioteca e saiba como chegar.",
  },
  {
    icon: CalendarDays,
    title: "Eventos",
    text: "Confira nossa programação de atividades e eventos.",
  },
  {
    icon: Mail,
    title: "Contato",
    text: "Fale conosco ou envie sua mensagem.",
  },
];

export const events = [
  {
    day: "18",
    month: "MAI",
    title: "Clube de Leitura",
    time: "Sábado · 10h",
    text: "Encontro para conversar sobre o livro do mês.",
    icon: BookOpen,
  },
  {
    day: "24",
    month: "MAI",
    title: "Oficina de Ilustração",
    time: "Sábado · 14h",
    text: "Atividade gratuita para crianças e jovens.",
    icon: PencilLine,
  },
  {
    day: "31",
    month: "MAI",
    title: "Roda de Conversa",
    time: "Sábado · 16h",
    text: "Diálogo sobre literatura e sociedade.",
    icon: MessagesSquare,
  },
];
