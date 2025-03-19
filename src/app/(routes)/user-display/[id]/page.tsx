"use client";

import UserForm from '@/app/components/display/user-form'
import { Navigation } from '@/app/components/navigation/navigation'
import { User } from '@/app/schemas/userSchema'; // Importa o tipo correto do schema
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserDetailPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState<Partial<User> | null>(null); // Agora aceita valores parciais
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) throw new Error('Erro ao carregar usuário');

        const data = await response.json();

        // Garante que o ID está correto antes de setar no estado
        setUserData({ ...data, id: Number(data.id) });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-center text-white text-lg font-semibold'>
          Carregando usuário...
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto mt-10'>
      <Navigation />
      {userData ? (
        <UserForm  userData={userData} />
      ) : (
        <p className="text-center text-white text-lg font-semibold">Usuário não encontrado.</p>
      )}
    </div>
  );
}
