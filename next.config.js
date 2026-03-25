// import type { NextConfig } from "next";

const nextConfig = {
  images: {
    // permitir imagenes de dominios
    // domains: ["visitapp.la"],
    // configuracion avazada de imagenes y permitir bajo estas condiciones
    remotePatterns:[
        {
            protocol:"https",
            hostname:"visitapp.io",
            pathname:"/images/**"
        }
    ]
}
  ,
};

export default nextConfig;