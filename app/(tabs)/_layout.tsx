import { Tabs } from 'expo-router'
import React from 'react'

const _Layout = () => {
  return (
    <Tabs>
         <Tabs.Screen
        options={{
            headerShown:false
        }}
        name='home'
        />
    </Tabs>
  )
}

export default _Layout