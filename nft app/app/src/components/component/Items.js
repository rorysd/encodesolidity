import TokenMetadataItem from './SubItem';

function TokenMetadataList(props) {
    console.log(props.tokensMetadata);
    return (
      <ul className={classes.list}>
        {props.tokensMetadata.map((tokenMetadata) => (
          <TokenMetadataItem
            key={tokenMetadata.tokenId}
            tokenId={tokenMetadata.tokenId}
            tokenOwner={tokenMetadata.tokenOwner}
            tokenUri={tokenMetadata.tokenUri}
          />
        ))}
      </ul>
    );
}

export default TokenMetadataList;
