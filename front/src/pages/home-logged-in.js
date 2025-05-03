import { useEffect, useCallback } from 'react'
import { useStateContext } from '../utils/context/StateContext'
import Layout from '../components/Layout'
import {
  Intro,
  Selection,
  Partners,
  HotBid,
  Categories,
  Discover,
  Description,
} from '../screens/Home'
import chooseBySlug from '../utils/chooseBySlug'
import { getDataByCategory, getAllDataByType } from '../lib/cosmic'
import { authService } from '../services/authService'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const HomeLoggedIn = ({
  reviews,
  landing,
  categoriesGroup,
  categoryTypes,
  navigationItems,
}) => {
  const { categories, onCategoriesChange, setNavigation } = useStateContext()

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  const handleContextAdd = useCallback(
    (category, data, navigation) => {
      onCategoriesChange({ groups: category, type: data })
      setNavigation(navigation)
    },
    [onCategoriesChange, setNavigation]
  )

  useEffect(() => {
    let isMounted = true

    if (!categories['groups']?.length && isMounted) {
      handleContextAdd(
        categoriesGroup?.groups,
        categoriesGroup?.type,
        navigationItems[0]?.metadata
      )
    }

    return () => {
      isMounted = false
    }
  }, [
    categories,
    categoriesGroup,
    categoryTypes,
    handleContextAdd,
    navigationItems,
  ])

  return (
    <ProtectedRoute>
      <Layout navigationPaths={navigationItems[0]?.metadata} showLogout={true} onLogout={handleLogout}>
        <Description info={chooseBySlug(landing, 'marketing')} />
        <HotBid classSection="section" info={categoriesGroup['groups'][0]} />
        <Categories
          info={categoriesGroup['groups']}
          type={categoriesGroup['type']}
        />
        <Selection info={categoriesGroup['groups']} type={categoryTypes} />
        <Intro info={chooseBySlug(landing, 'introduction')} />
        <Partners info={reviews} />
        <Discover
          info={categoriesGroup['groups']}
          type={categoriesGroup['type']}
        />
      </Layout>
    </ProtectedRoute>
  )
}

export default HomeLoggedIn

export async function getServerSideProps() {
  const reviews = (await getAllDataByType('reviews')) || []
  const landing = (await getAllDataByType('landings')) || []
  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: {
      reviews,
      landing,
      categoriesGroup,
      categoryTypes,
      navigationItems,
    },
  }
} 