import Card from './Item';

function TokenMetadataItem(props) {
    function getIpfsUrl(uri) {
        return `https://ipfs.infura.io/ipfs/${uri}`;
    }

    return (
      <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h3>TokenID: {props.tokenId}</h3>
            <p>Token Owner: {props.tokenOwner}</p>
            <img className={classes.image} alt="tokenUri" src={getIpfsUrl(props.tokenUri)} />
          </div>
        </Card>
      </li>
    );
}

export default TokenMetadataItem;
