import type { MetadataRoute } from "next"
import { fetchCars, carSlug } from "@/lib/car-data"

const siteUrl = "https://sambitopgearmotors.com"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await fetchCars()

  const carUrls: MetadataRoute.Sitemap = cars
    .filter(c => c.status?.toLowerCase() !== "sold")
    .map(car => ({
      url: `${siteUrl}/cars/${carSlug(car)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }))

  return [
    { url: siteUrl,                    lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${siteUrl}/cars`,          lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${siteUrl}/services`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/services/used-car-sales`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services/vehicle-sourcing`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services/financing`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services/insurance`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services/pre-sale-inspection`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/services/ai-price-engine`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...carUrls,
  ]
}
