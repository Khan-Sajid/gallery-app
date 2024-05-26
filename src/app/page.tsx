import styles from "./page.module.css";
import { Loading } from "@/components/loading";
import { MainComponent } from "@/components/mainComponent";
import { getImages } from "@/http";
import { Suspense } from "react";

export default async function Home() {
  const ImagesData = await getImages();
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <MainComponent ImagesData={ImagesData} />
      </Suspense>
    </main>
  );
}
