/* eslint-disable new-cap */
import React, { PropTypes, Component } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { SharedElementTransition } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { TMDB_IMG_URL } from '../../../constants/api';
import styles from './styles/CardThree';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
const PREFIX = 'C3';

const CardThree = ({ info, viewMovie }) => {
	const sharedElementId = `${PREFIX}:${info.id}`;
	return (
		<View style={styles.cardContainer}>
			<TouchableOpacity activeOpacity={0.9} onPress={viewMovie.bind(this, info.id, info, sharedElementId)}>
				<View style={styles.card}>
					<SharedElementTransition sharedElementId={sharedElementId}>
						<Image source={{ uri: `${TMDB_IMG_URL}/w185/${info.poster_path}` }} style={styles.cardImage} />
					</SharedElementTransition>
					<View style={styles.cardDetails}>
						<Text
							style={styles.cardTitle}
							numberOfLines={3}>
							{info.original_title}
						</Text>
						<View style={styles.cardGenre}>
							<Text style={styles.cardGenreItem}>{info.release_date.substring(0, 4)}</Text>
						</View>
						<View style={styles.cardNumbers}>
							<View style={styles.cardStar}>
								{iconStar}
								<Text style={styles.cardStarRatings}>{info.vote_average.toFixed(1)}</Text>
							</View>
							<Text style={styles.cardRunningHours} />
						</View>
						<Text style={styles.cardDescription} numberOfLines={3}>
							{info.overview}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

CardThree.propTypes = {
	info: PropTypes.object.isRequired,
	viewMovie: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		moviesGenres: state.movies.genres
	};
}

export default connect(mapStateToProps, null)(CardThree);
