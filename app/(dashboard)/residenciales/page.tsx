
import { getResidentials } from "@/services/ResidentialsServices";
import GridContainer from "@/components/GridContainer";
import CardResidential from "@/components/residentials/CardResidential";
import BlueSpinner from "@/components/spinner/BlueSpinner";
import { ResidentialInformation } from "@/types/residencial/residencialTypes";
import { unstable_cache } from "next/cache";

const getResidentialCached = unstable_cache(
    async () => {
        const { data } = await getResidentials();
        return data;
    },
    ['residentials'],
    {
        revalidate: 10,
    }
);

type Props = {
    params: {
        tenant: string;
    }
}
async function page({params}:Props) {


    const data = await getResidentialCached();
    console.log(data)
    return (
        <div className={`w-full h-full 
            overflow-scroll
        `}>
            <GridContainer
                component={
                    data && data.length > 0 ?
                        data.map((residential: ResidentialInformation) => (
                            <CardResidential
                                key={residential.tenant}
                                {...residential}
                            />
                        ))
                        : <BlueSpinner />
                }
            />
        </div>
    )
}

export default page;