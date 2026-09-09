import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartToast } from '../components/common/CartToast';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amazon-bg text-amazon-text font-sans antialiased relative">
      <Header />
      <main className="flex-1 w-full" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CartToast />
    </div>
  );
};
