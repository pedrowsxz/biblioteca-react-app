import { Clock3, MapPin, CalendarDays, Mail } from "lucide-react";

export const navItems = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Catálogo", path: "/catalogo" },
  { label: "Eventos", path: "/eventos" },
  { label: "Visite-nos", path: "/visite" },
];

export const visitorInfo = {
  title: "Visite-nos",
  subtitle: "Endereço & Horários",

  address: [
    "Biblioteca Pública Municipal Juscelino Kubitschek de Oliveira",
    "Praça Prof. Jacy de Assis - s/n",
    "Centro, Uberlândia - MG",
    "CEP 38400-121",
  ],

  phone: "(34) 3235-1865",

  email: "biblioteca@uberlandia.mg.gov.br",

  mapLabel: "Biblioteca Municipal",

  hours: [
    { day: "Segunda-Feira", time: "08:15 - 18:45" },
    { day: "Terça-Feira", time: "08:15 - 18:45" },
    { day: "Quarta-Feira", time: "08:15 - 18:45" },
    { day: "Quinta-Feira", time: "08:15 - 18:45" },
    { day: "Sexta-Feira", time: "08:15 - 18:45" },
    { day: "Sábado", time: "Fechado" },
    { day: "Domingo", time: "Fechado" },
  ],
  };

  export const quickCards = [
    {
      icon: Clock3,
      title: "Horários",
      text: "De Segunda a Sexta-feira das 8:15 às 18:45.",
    },
    {
      icon: MapPin,
      title: "Localização",
      text: "Praça Prof. Jacy de Assis - s/n - Centro, Uberlândia - MG",
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
