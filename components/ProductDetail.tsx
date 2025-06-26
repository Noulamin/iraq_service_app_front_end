import { FunctionComponent } from "react";

interface ProductDetailProps {
    currency: "MAD" | "$"
    productType: "tool" | "pack"
    productData: any;
    period: "month" | "year" | "day";
}



const ProductDetail: FunctionComponent<ProductDetailProps> = ({ period, productData, productType, currency }) => {

    const displayPrice = (currency: "MAD" | "$", productType: "tool" | "pack") => {


        if (productType === "tool") {
            if (currency === "MAD") {

                switch (period) {
                    case "day":
                        return productData?.tool_day_price * 10 + ` ${currency}`
                    case "month":
                        return productData?.tool_month_price * 10 + ` ${currency}`
                    case "year":
                        return productData?.tool_year_price * 10 + ` ${currency}`
                }
            }

            if (currency === "$") {

                switch (period) {
                    case "day":
                        return productData?.tool_day_price + ` ${currency}`
                    case "month":
                        return productData?.tool_month_price + ` ${currency}`
                    case "year":
                        return productData?.tool_year_price + ` ${currency}`
                }
            }
        }

        if (productType === "pack") {
            if (currency === "MAD") {
                return productData?.pack_price * 10 + ` ${currency}`
            }

            if (currency === "$") {
                return productData?.pack_price + ` ${currency}`
            }
        }
    }    

    return (
        <div
            className="px-4 py-2 text-start text-sm text-[#1E429F] absolute top-5 rounded-lg border-1 border-[#1E429F] bg-[#EBF5FF]"
            role="alert"
        >
            <span className="font-medium">Product : </span>

            {`1 ${period} of ${productType === 'tool' ? productData?.tool_name : productData?.pack_name + ' Pack'}`}

            <br />

            <span className="font-medium">Total : </span>

            {displayPrice(currency, productType)}
        </div>
    )
}

export default ProductDetail