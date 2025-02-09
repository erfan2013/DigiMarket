import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizentalCardProduct from '../components/HorizentalCardProduct'
import VerticalCardProduct from '../components/VerticalProduct'


const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizentalCardProduct category ={"airpodes"}  heading={"Top  Airpodes"} />
      <HorizentalCardProduct category ={"mouse"}  heading={"Pupular Mouse"} />
      <HorizentalCardProduct category ={"earphones"}  heading={"Top  Earphones"} />
      <VerticalCardProduct category ={"mobiles"}  heading={"Best Mobile"} />
      <VerticalCardProduct category ={"camera"}  heading={"Recomend camera"} />

    </div>
  )
}

export default Home
