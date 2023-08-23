import React from 'react';
import Layout from '../Layout/Layout';

function NotFound() {
  return (
    <Layout>
      <div className="flex m-auto items-center justify-center p-5 bg-white w-full">
        <div className="text-center">
          <div className="inline-flex rounded-full bg-sky-100 p-4">
            <div className="rounded-full stroke-sky-600 bg-sky-200 p-4">
              <svg className="w-16 h-16" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </div>
          </div>
          <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">Page non trouvée</h1>
          <p className="text-slate-600 mt-5 lg:text-lg">La page que vous recherchez n'existe pas ou <br />a été retiré.</p>
        </div>
      </div>
    </Layout>
  )
}

export default NotFound
