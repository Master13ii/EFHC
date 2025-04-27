"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { BaseTemplate } from "@/templates/BaseTemplate";

export default function AuthLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const translations = {
    ru: {
      signIn: {
        start: {
          title: "Вход",
          subtitle: "Войдите в свой аккаунт",
          actionText: "Войти",
          actionLink: "Нет аккаунта? Зарегистрируйтесь",
        },
      },
      signUp: {
        start: {
          title: "Регистрация",
          subtitle: "Создайте новый аккаунт",
          actionText: "Зарегистрироваться",
          actionLink: "Уже есть аккаунт? Войдите",
        },
      },
    },
    uk: {
      signIn: {
        start: {
          title: "Вхід",
          subtitle: "Увійдіть у свій обліковий запис",
          actionText: "Увійти",
          actionLink: "Немає облікового запису? Зареєструйтесь",
        },
      },
      signUp: {
        start: {
          title: "Реєстрація",
          subtitle: "Створіть новий обліковий запис",
          actionText: "Зареєструватися",
          actionLink: "Вже є обліковий запис? Увійдіть",
        },
      },
    },
  };

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={{
        locale,
        translations: translations[locale as keyof typeof translations],
      }}
      appearance={{
        baseTheme: "light",
        variables: { colorPrimary: "#1a73e8" },
      }}
    >
      <BaseTemplate>{children}</BaseTemplate>
    </ClerkProvider>
  );
}
