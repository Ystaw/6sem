import React, { useState } from 'react';
import { authService, SignUpData } from '../../services/authService';
import { useRouter } from 'next/router';
import cn from 'classnames';
import styles from './auth.module.sass';

interface SignUpFormProps {
  className?: string;
  onSuccess?: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ className, onSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignUpData>({
    username: '',
    email: '',
    password: '',
    role: 'USER'
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

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
      await authService.signUp(formData);
      setSuccess('Пользователь успешно зарегистрирован');
      setError('');
    } catch (err: any) {
      setError(err.response?.data || 'Ошибка при регистрации');
      setSuccess('');
    }
  };

  return (
    <div className={cn(className, styles.transfer)}>
      <div className={cn('h4', styles.title)}>Регистрация</div>
      <div className={styles.text}>
        Введите свои данные для регистрации
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
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
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
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
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm; 