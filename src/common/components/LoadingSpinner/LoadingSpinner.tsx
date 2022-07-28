import React from 'react';
import {Center, Spinner} from "@chakra-ui/react";

interface Props {
    zIndex?: string;
    absolute: boolean;
}

export const LoadingSpinner = (props: Props) => {
    const {zIndex, absolute} = props;
    return (
        <Center>
            <Spinner
                mt="20px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="red.500"
                size="xl"
                zIndex={zIndex}
                position={absolute ? "absolute" : undefined}
            />
        </Center>
    );
};
