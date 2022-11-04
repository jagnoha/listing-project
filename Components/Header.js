import React from 'react';
import { useRecoilState } from 'recoil';
import { Appbar, useTheme } from 'react-native-paper';
import selectedAtom from '../Store/atoms/selectedAtom';

export default function Header(props) {
    const theme = useTheme();
    const [selected, setSelected] = useRecoilState(selectedAtom);
  
    const onBack = () => {
       setSelected([]);
    }

    if (props.type === 'selection'){
        if (props.indexTab === 0){
            return (

                <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
                <Appbar.BackAction onPress={()=>onBack()} />
                <Appbar.Content title={props.title} color={theme.colors.onBackground} />
                <Appbar.Action icon='delete-outline' onPress={()=>console.log('Delete items!')} />
                </Appbar.Header>

            );
        } 
    }
    

    return (
            
                <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
                    <Appbar.Content title={props.title} color={theme.colors.onBackground} titleStyle={{textAlign: 'center'}} />            
                </Appbar.Header>
            
        
    );
}

