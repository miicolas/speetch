"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

export default function ScrollSmooth({ children, duration }: { children: ReactNode; duration: number }) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1); 
  }, [pathname]);

  return (
    <ReactLenis key={key} root options={{ duration: duration, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
