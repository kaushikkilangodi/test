import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const StyledAppLayout = styled.div`
  width: 425px;
  height: 100vh;
  margin: 0 auto;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding: 1rem;
  overflow: auto;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Root = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <Footer />
      <TanStackRouterDevtools position="top-right" />
    </StyledAppLayout>
  );
};
