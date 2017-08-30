import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SharedElementTransition } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/CardOne';
import { TMDB_IMG_URL } from '../../../constants/api';

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);
const PREFIX = 'C1';

const CardOne = ({ info, viewMovie }) => {
	const sharedElementId = `${PREFIX}:${info.id}`;
	return (
		<View>
			<Image source={{ uri: `${TMDB_IMG_URL}/w780/${(info.backdrop_path || info.poster_path)}` }} style={styles.imageBackdrop} />
			<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
			<View style={styles.cardContainer}>
				<SharedElementTransition
					sharedElementId={sharedElementId}
				>
					<Image source={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} style={styles.cardImage} />
				</SharedElementTransition>
				<View style={styles.cardDetails}>
					<Text style={styles.cardTitle} numberOfLines={2}>
						{info.original_title}
					</Text>
					<View style={styles.cardGenre}>
						<Text style={styles.cardGenreItem}>Action</Text>
					</View>
					<View style={styles.cardNumbers}>
						<View style={styles.cardStar}>
							{iconStar}
							<Text style={styles.cardStarRatings}>8.9</Text>
						</View>
						<Text style={styles.cardRunningHours} />
					</View>
					<Text style={styles.cardDescription} numberOfLines={3}>
						{info.overview}
					</Text>
					<TouchableOpacity activeOpacity={0.9} onPress={viewMovie.bind(this, info.id, info, sharedElementId)}>
						<View style={styles.viewButton}>
							<Text style={styles.viewButtonText}>View Details</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

CardOne.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

export default CardOne;
