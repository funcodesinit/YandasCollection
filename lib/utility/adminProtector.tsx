// utils/withProtectedRoute.tsx

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export const withProtectedRoute = (Page: any) => {
  const ProtectedPage = (props: any) => {
    return <Page {...props} />;
  };

  ProtectedPage.getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    // If the session doesn't exist or the user isn't STAFF, redirect them to home
    if (!session || session.user.role !== 'STAFF') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // If the user is authorized, return the page props
    return {
      props: {},
    };
  };

  return ProtectedPage;
};
