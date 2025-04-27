import { getI18nPath } from '@/utils/Helpers';
import { SignUp } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <SignUp
        path={getI18nPath('/sign-up', locale)}
        routing="path"
        appearance={{
          baseTheme: "light",
          variables: { colorPrimary: "#1a73e8" },
        }}
      />
    </div>
  );
}
