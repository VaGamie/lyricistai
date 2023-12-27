import React from 'react';
import Skeleton from 'react-loading-skeleton';

class FavoriteSkeleton extends React.Component {
    render() {

        const custom_skeleton = {
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            zIndex: '1',
      
          }

            const text_skeleton = {
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                zIndex: '1',
                alighItems: 'center',
                justifyContent: 'center',
                transition: '.3s ease',
                top: '135px',
                marginBottom: '10px',
        
            }
        return (
            <div >
                <Skeleton baseColor='gray'  animation='wave' count={5}  style={text_skeleton} width={400} height={250} />
            </div>
        );
    }
}

export default FavoriteSkeleton;
