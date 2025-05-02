import React, { useState } from 'react';
import { authService, SignInData } from '../../services/authService';
import { useRouter } from 'next/router';
import cn from 'classnames';
import styles from './auth.module.sass';

interface SignInFormProps {
  className?: string;
  onSuccess?: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ className, onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.signIn(formData);
      if (response.token) {
        onSuccess?.();
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data || 'Ошибка при авторизации');
    }
  };

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>Вход</div>
      <div className={styles.text}>
        Введите свои данные для входа
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Имя пользователя"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <div className={styles.btns}>
          <button type="submit" className={cn('button', styles.button)}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm; 