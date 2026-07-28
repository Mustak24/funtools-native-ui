import { getCountryByDialCode, COUNTRY_CODE } from "./country-codes";
import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { ItemSelector } from "../../../overlay";
import { useAnimatedValue } from "@hooks";
import { ThemeText, ThemeView } from "@core";

type CountryCodeSelectorProps = {
    value: string,
    onChangeValue?: (val: string) => void
    disabled?: boolean
}

export default function CountryCodeSelector(props: CountryCodeSelectorProps) {

    const [isSelectorVisible, setIsSelectorVisible] = useState(false);
    
    const animatedValue = useAnimatedValue(0);
    const countryInfo = useMemo(() => getCountryByDialCode(props.value), [props.value]);

    useEffect(() => {
        const animation = animatedValue.timingAnimation({
            toValue: isSelectorVisible ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        });
        
        animation.start();
        return () => animation.stop();
    }, [isSelectorVisible])


    return (
        <Pressable 
            style={{flexDirection: 'row', alignItems: 'center', gap: 8}}
            disabled={props.disabled}
            onPress={() => {
                if(props.disabled) return;
                setIsSelectorVisible(true);
            }}
        >
            <ThemeText>{countryInfo?.flag}</ThemeText>
            <ThemeText style={{fontSize: 12}} >{countryInfo?.dialCode}</ThemeText>

            <ItemSelector
                visible={isSelectorVisible}
                onClose={() => setIsSelectorVisible(false)}

                data={COUNTRY_CODE}
                selectedItem={countryInfo}
                title="Country Codes"
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}} >
                        <ThemeText style={{fontWeight: 'semibold'}}>
                            {item.flag} {item.name}
                        </ThemeText>
                        <ThemeText color="text-secondary" style={{fontWeight: 'bold'}} >
                            {item.dialCode}
                        </ThemeText>
                    </View>
                )}
                
                renderSelectedItem={item => (
                    <ThemeView color="primary" style={{paddingBlock: 8, paddingInline: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%'}} >
                        <View>
                            <ThemeText textColor="white" style={{fontSize: 12}}>
                                {item.flag} {item.name} Country
                            </ThemeText>
                            <ThemeText textColor="white" style={{fontWeight: 'bold'}} >
                                {item.dialCode}
                            </ThemeText>
                        </View>
                        <ThemeText style={{fontWeight: 'bold'}} textColor="white" >
                            Selected
                        </ThemeText>
                    </ThemeView>
                )}

                onSelectItem={(item) => {
                    props.onChangeValue?.(item.dialCode);
                    setIsSelectorVisible(false);
                }}
            />
        </Pressable>
    )
}