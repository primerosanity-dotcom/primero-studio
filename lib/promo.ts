import { getService, type Service } from "@/lib/services";
import { getPackage } from "@/lib/content";

/**
 * /pakiety/promocja-otwarcia was the landing page of the opening offer
 * (polishing + ceramic coating, 1 400 zł). Ads still point here, so the URL
 * stays and now shows the package that replaced the offer — at its current
 * price, without a crossed-out "old" price.
 */
export const PROMO_SLUG = "promocja-otwarcia";
export const PROMO_PACKAGE_SLUG = "polerowanie-ceramika-1-rok";

export async function getPromoPackage(): Promise<Service | undefined> {
  return (await getPackage(PROMO_PACKAGE_SLUG)) ?? getService(PROMO_PACKAGE_SLUG);
}
