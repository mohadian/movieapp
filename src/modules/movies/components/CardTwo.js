import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';

import { SharedElementTransition } from 'react-native-navigation';
import styles from './styles/CardTwo';
import { TMDB_IMG_URL } from '../../../constants/api';

const PREFIX = 'C2';

const CardTwo = ({ info, viewMovie }) => {
	const sharedElementId = `${PREFIX}:${info.id}`;
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={viewMovie.bind(this, info.id, info, sharedElementId)}>
			<View style={styles.cardContainer}>
				<SharedElementTransition
					sharedElementId={sharedElementId}
				>
					<Image source={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} style={styles.cardImage} />
				</SharedElementTransition>
				<View style={styles.cardTitleContainer}>
					<Text style={styles.cardTitle} numberOfLines={2}>
						{info.original_title}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
};

CardTwo.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

export default CardTwo;
