'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  factoryName: string;
  initials: string;
}

const defaultProfile: UserProfile = {
  fullName: 'Admin User',
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@factorymind.ai',
  phone: '+1 (555) 0123',
  role: 'Factory Admin',
  factoryName: 'Main Manufacturing Plant — Building A',
  initials: 'AU',
};

interface UserContextType {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  signUp: (data: { fullName: string; email: string; role: string; factoryName: string }) => void;
}

const UserContext = createContext<UserContextType>({
  user: defaultProfile,
  updateUser: () => {},
  signUp: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('factorymind_user_profile');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load user profile from storage', e);
    }
  }, []);

  const saveToStorage = (updated: UserProfile) => {
    setUser(updated);
    try {
      localStorage.setItem('factorymind_user_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save user profile to storage', e);
    }
  };

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      if (data.fullName && !data.firstName) {
        const parts = data.fullName.trim().split(' ');
        updated.firstName = parts[0] || '';
        updated.lastName = parts.slice(1).join(' ') || '';
      }
      if (updated.fullName) {
        const parts = updated.fullName.trim().split(' ');
        const f = parts[0]?.[0] || 'A';
        const l = parts[parts.length - 1]?.[0] || 'U';
        updated.initials = (f + l).toUpperCase();
      }
      saveToStorage(updated);
      return updated;
    });
  };

  const signUp = (data: { fullName: string; email: string; role: string; factoryName: string }) => {
    const parts = data.fullName.trim().split(' ');
    const firstName = parts[0] || 'User';
    const lastName = parts.slice(1).join(' ') || '';
    const f = firstName[0] || 'U';
    const l = (lastName[0] || firstName[1] || 'S').toUpperCase();
    const initials = (f + l).toUpperCase();

    const newProfile: UserProfile = {
      fullName: data.fullName,
      firstName,
      lastName,
      email: data.email,
      phone: '+1 (555) 987-6543',
      role: data.role || 'Factory Admin',
      factoryName: data.factoryName || 'Smart Industrial Plant 1',
      initials,
    };
    saveToStorage(newProfile);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, signUp }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
