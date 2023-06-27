import { FC } from "react";
import Header from "../components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import NotificationsFeed from "../components/NotificationsFeed";

const NotificationsList: FC = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow={true} />
      <NotificationsFeed />
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permenent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

export default NotificationsList;
