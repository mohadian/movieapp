import React, { Component, PropTypes } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ToastAndroid
} from 'react-native'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from '../movies/movies.actions';
import ProgressBar from './ProgressBar';

import styles from './styles/NetflixMenu';

import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcons from 'react-native-vector-icons/Ionicons'


const {width, height} = Dimensions.get('window')

const uri = 'https://pickaface.net/gallery/avatar/unr_mostafa_170829_2157_2qj94th.png';

class NetflixMenu extends Component {

    constructor(props) {
      super(props);

      this.state = {
        isLoading: true
      };

      this._goToMovies = this._goToMovies.bind(this);
      this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    componentWillMount() {
      this._retrieveMoviesGenre();
    }

    componentWillReceiveProps(nextProps) {
  		if (nextProps.moviesGenres) {
  			this.setState({ isLoading: false });
  		}
  	}

    _retrieveMoviesGenre(isRefreshed) {
      this.props.actions.retrieveMoviesGenres();
    }

    _viewMoviesList(type, title) {
  		let rightButtons = [];
  		if (Platform.OS === 'ios') {
  			rightButtons = [
  				{
  					id: 'close',
  					title: 'Close',
  					icon: iconsMap['ios-close']
  				}
  			];
  		}
  		this.props.navigator.showModal({
  			title,
  			screen: 'ReactMovieDB.MoviesList',
  			passProps: {
  				type
  			},
  			navigatorButtons: {
  				rightButtons
  			}
  		});
  	}

    _goToMovies() {
      this._toggleDrawer();
      this.props.navigator.popToRoot({
        screen: 'ReactMovieDB.Movies'
      });
    }

    _toggleDrawer() {
  		this.props.navigator.toggleDrawer({
  			to: 'closed',
  			side: 'left',
  			animated: true
  		});
  	}

    _renderItemsMenu(){
        return (this.state.isLoading) ? <View style={styles.progressBar}><ProgressBar /></View> :
        this.props.moviesGenres.genres.map((element, key) => (
          <TouchableHighlight
              key={element.id}
              style={styles.noSelectedItems}
              onPress={this._viewMoviesList.bind(this, 'popular', 'Popular')}
          >
              <Text style={styles.text}>{element.name}</Text>
          </TouchableHighlight>
        ))
    }

    _onNavigatorEvent(event) {
  		if (event.type === 'NavBarButtonPress') {
  			if (event.id === 'search') {
  				let rightButtons = [];
  				if (Platform.OS === 'ios') {
  					rightButtons = [
  						{
  							id: 'close',
  							title: 'Close',
  							icon: iconsMap['ios-close']
  						}
  					];
  				}
  				this.props.navigator.showModal({
  					screen: 'ReactMovieDB.Search',
  					title: 'Search',
  					navigatorButtons: {
  						rightButtons
  					}
  				});
  			}
  		}
  	}

    render(){
      const { moviesGenres } = this.props;
      const iconMovies = (<IonIcons name="md-film" size={28} color="white" style={styles.iconWithText} />);
  		const iconTV = (<IonIcons name="ios-desktop" size={28} color="white" style={styles.iconWithText} />);
      const rightArrow = (<Icon style={styles.rightIcon} name="angle-right" color="white" size={25} />);
        return (
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        <Image
                            style = {styles.avatar}
                            source={{ uri }}
                        />
                        <Text style = {styles.text}>Mostafa</Text>
                    </View>
                    <Icon
                        name="exchange"
                        color = "white"
                        size = {25}
                    />
                </View>
                <ScrollView style={styles.scrollContainer}>
                  <TouchableOpacity style={styles.itemSelected} onPress={this._goToMovies}>
                    <View style={styles.textWithIcon}>
                      <View style={styles.withIcon}>
                        {iconMovies}
                        <Text style={styles.text}>
                          Movies
                        </Text>
                      </View>
                      {rightArrow}
                    </View>
                  </TouchableOpacity>
                  <View style={styles.textWithIcon}>
                    <View style={styles.withIcon}>
                        {iconTV}
                      <Text style={styles.text}>TV</Text>
                    </View>
                      {rightArrow}
                  </View>
                  {this._renderItemsMenu()}
                </ScrollView>
            </View>
        )
    }
}

NetflixMenu.propTypes = {
  actions: PropTypes.object.isRequired,
  moviesGenres: PropTypes.object,
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		moviesGenres: state.movies.genres
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NetflixMenu);
