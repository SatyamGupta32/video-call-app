import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Navbar from '../components/Navbar/Navbar'

const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className='h-screen'>
            <div className='flex'>
                {showSidebar && <Sidebar />}
                <div className='flex-1 flex flex-col'>
                    <Navbar />
                    <main className='flex-1 overflow-y-auto'>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout
