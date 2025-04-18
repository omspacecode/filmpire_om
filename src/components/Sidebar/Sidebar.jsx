import React, { useEffect} from 'react';
import {Divider, List, ListItem, ListItemText, ListSubheader, LisItemIcon, Box, CircularProgress, ListItemIcon } from '@mui/material';
import { Link } from  'react-router-dom';
import { useTheme } from '@mui/styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import genreIcons from '../../assets/genres';

const categories = [
    {label: 'Popular', value: 'popular'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Upcoming', value: 'upcoming'},
];
const demoCategories = [
    {label: 'Action', value: 'action'},
    {label: 'Comedy', value: 'comedy'},
    {label: 'Anime', value: 'anime'},
];
const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({setMobileOpen}) => {
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
    const theme = useTheme();
    const classes = useStyles();
    const { data, error, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();
  return (
    <>
        <Link to="/" className={classes.imageLink}>
            <img 
                className={classes.image}
                src={theme.palette.mode === 'light' ? redLogo : blueLogo}
                alt="FilmPire Om Logo"
            />
        </Link>
        <Divider/>
        <List>
            <ListSubheader>Categories</ListSubheader>
            {categories.map(({ label, value }) => (
                <Link key={value} className={classes.links} to="/">
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                    <ListItemIcon>
                        <img src={genreIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider/>
        <List>
            <ListSubheader>Genres</ListSubheader>
            {isFetching ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
                ) : data.genres.map(({ name, id }) => (
                <Link key={name} className={classes.links} to="/">
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                        <ListItemIcon>
                        <img src={genreIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>
            ))}
        </List>
    </>
  )
}

export default Sidebar