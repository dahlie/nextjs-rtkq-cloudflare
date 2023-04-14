import { Inter } from "next/font/google";
import { useGetCloudsQuery } from "@/lib/aivenApi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const result = useGetCloudsQuery();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className={`${inter.className} mb-3 text-2xl font-semibold`}>
        Clouds
      </h1>

      {result.isLoading && <div>Loading...</div>}
      {result.data && (
        <ul>
          {result.data.clouds.map((cloud) => (
            <li key={cloud.cloud_name} className="mb-5">
              <div>{cloud.cloud_name}</div>
              <div className="text-gray-500">{cloud.cloud_description}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
