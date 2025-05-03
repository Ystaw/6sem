import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import AppLink from '../AppLink'
import Icon from '../Icon'
import Image from 'next/image'
import User from './User'
import Theme from '../Theme'
import Modal from '../Modal'
import { useStateContext } from '../../utils/context/StateContext'
import { getToken, removeToken } from '../../utils/token'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'

import styles from './Header.module.sass'

const Headers = ({ navigation, showLogout, onLogout }) => {
  const [visibleNav, setVisibleNav] = useState(false)
  const [visibleAuthModal, setVisibleAuthModal] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)

  const { user, setUser } = useStateContext()

  useEffect(() => {
    let isMounted = true
    const localUser = getToken()
    if (isMounted && !user?.id && localUser?.id) {
      setUser(localUser)
    }

    return () => {
      isMounted = false
    }
  }, [user, setUser])

  const handleAuthSuccess = useCallback(() => {
    setVisibleAuthModal(false)
  }, [])

  const toggleAuthForm = useCallback(() => {
    setIsLoginForm(prev => !prev)
  }, [])

  return (
    <>
      <header className={styles.header}>
        <div className={cn('container', styles.container)} aria-hidden="true">
          <AppLink className={styles.logo} href="/">
            <Image
              width={256}
              height={120}
              objectFit='contain'
              className={styles.pic}
              src={navigation['logo']?.imgix_url}
              alt="Logo"
              priority
            />
          </AppLink>
          <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
            <nav className={styles.nav}>
              {navigation['menu']?.map((x, index) => (
                <AppLink
                  aria-label="navigation"
                  className={styles.link}
                  href={x?.url || `/search`}
                  key={index}
                >
                  {x.title}
                </AppLink>
              ))}
            </nav>
          </div>
          <div className={styles.version}>
            <Theme className="theme-big" />
          </div>
          <AppLink
            aria-label="search"
            aria-hidden="true"
            className={cn('button-small', styles.button)}
            href={`/search`}
          >
            <Icon name="search" size="20" />
            Search
          </AppLink>
          {showLogout ? (
            <button
              aria-label="logout"
              aria-hidden="true"
              className={cn('button-small', styles.button, styles.logout)}
              onClick={onLogout}
            >
              Выйти
            </button>
          ) : (
            <button
              aria-label="login"
              aria-hidden="true"
              className={cn('button-small', styles.button, styles.login)}
              onClick={() => setVisibleAuthModal(true)}
            >
              Войти
            </button>
          )}
          <button
            aria-label="user-information"
            aria-hidden="true"
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => setVisibleNav(!visibleNav)}
          />
        </div>
      </header>

      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
        outerClassName={styles.modal}
      >
        <div className={styles.steps}>
          <div className={styles.tabs}>
            <button
              className={cn(styles.tab, { [styles.active]: isLoginForm })}
              onClick={() => setIsLoginForm(true)}
            >
              Вход
            </button>
            <button
              className={cn(styles.tab, { [styles.active]: !isLoginForm })}
              onClick={() => setIsLoginForm(false)}
            >
              Регистрация
            </button>
          </div>
          <div className={styles.content}>
            {isLoginForm ? (
              <SignInForm onSuccess={handleAuthSuccess} />
            ) : (
              <SignUpForm onSuccess={handleAuthSuccess} />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Headers
