/**
 * @file search
 * @author Mingze Ma
 */

import React, {useCallback, useEffect, useState} from "react";
import Container from "@mui/material/Container";
import {Divider, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useSearchParams} from "react-router-dom";
import actions from "src/actions";
import Box from "@mui/material/Box";
import ProductCard from "src/components/ProductCard";
import {Empty} from "antd";
import _ from "lodash";
import CircularProgress from "@mui/material/CircularProgress";

const Search: React.FC = () => {
  const [urlParam, setUrlParams] = useSearchParams();

  const [initial] = useState(urlParam.get('keyword'));
  const [searchContent, setSearchContent] = useState(urlParam.get('keyword'));
  const [searchResult, setSearchResult] = useState([]);
  const [loaidng, setLoading] = useState(true);

  const searchCommodity = useCallback(async (value: any) => {
    setLoading(true);
    try {
      const res: any = await actions.searchCommodity({
        keyword: value || '',
        page_size: 12,
      });
      // ES handler
      // setSearchResult(_.get(res, 'content', ''));
      setSearchResult(res);
      console.log('--res--\n', res);
    } catch (e) {
      setSearchResult([]);
      console.error(e)
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchContentChange = useCallback((e: any) => {
    setSearchContent(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    setUrlParams({keyword: searchContent || ''});
    searchCommodity(searchContent);
  }, [searchCommodity, searchContent, setUrlParams]);

  const handleKeyPress = useCallback((e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleSearchClick = useCallback(() => handleSearch(), [handleSearch]);

  useEffect(() => {
    searchCommodity(initial);
  }, [initial, searchCommodity]);

  return (
    <Container disableGutters maxWidth="lg">
      <Grid container spacing={{xs: 1, sm: 2, md: 3}} rowSpacing={3} sx={{py: 4, px: {xs: 2, sm: 16}, display: 'flex'}}>
        <Grid item xs={12} sm={10}>
          <TextField
            fullWidth
            value={searchContent}
            onChange={handleSearchContentChange}
            placeholder="Search Modules"
            onKeyUp={handleKeyPress}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            sx={{minHeight: '100%'}}
            onClick={handleSearchClick}
          >Search</Button>
        </Grid>
      </Grid>
      <Divider />
      <Box sx={{py: 3, display: 'flex', justifyContent: 'center'}}>
        {!loaidng
          ? <>{!_.isEmpty(searchResult)
            ? <ProductCard data={searchResult}/>
            : <Empty />
          }</>
          : <CircularProgress />
        }
      </Box>
    </Container>
  );
};

export default Search;
