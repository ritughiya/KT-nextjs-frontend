import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Script from 'next/script'
import { sanityClient, urlFor} from '../sanity'
import Static from 'next/image'
import Customhead from "../components/Customhead"

import { If, Elif, Else } from 'rc-if-else';


const query = `*[_type == "collectionspage"] {
  pageTitle,
  collections[]->{
    collectionTitle,
    collectionDesc,
    size,
    backgroundImage
  }
}
`

const CollectionsPage = ({ properties }) => {

//   var elem = document.querySelector('.grid');
// var msnry = new Masonry( elem, {
//   // options
//   itemSelector: '.grid-item',
//   // use element for option
//   columnWidth: '.grid-sizer',
//   percentPosition: true,
//   horizontalOrder: true
// });

  return (
    <div className="Collections wrapper">
      <Customhead />

      {properties.map(post => (
              
        <div>
          <div className="title">
            <div className="pageTitle">Collections</div>
          <Link href="/">
          <div className="siteLogo">KASSANDRA THATCHER</div>
          </Link>
          <div>&nbsp;</div>
          </div>
         
          <div className="subtitle Rightsubtitle">
          <Link href="/archive">
          Archive
          </Link>
          </div>
          <div className="subtitle Bottomsubtitle">
          <Link href="/about">
          Information
          </Link>
          </div>

        <div className="Collectionswrapper">
        <div className="copy">
          <div className="groupTitle">The Collections</div>

          <div className="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": ".grid-sizer", "percentPosition": "true", "gutter": 10 }'>
          {post.collections && post.collections.map(({_id, slug = '', collectionTitle = '', collectionDesc = '', size = '', backgroundImage=''}) =>  (
                     <>
                     <If condition={size === "shorter"}>
                     <div key={_id} className="shortBlock Collectionblock grid-item">
                          <Link href="/collection/[slug]" as={`/collection/${slug.current}`}>
                            <div className="pointer">
                            {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                            {collectionDesc && <div className="collectionDesc">{collectionDesc}</div>}
                          </div>
                      </Link>
                     </div>
                     </If>

                      <If condition={size === "longer"}>
                      <div key={_id} className="longBlock Collectionblock grid-item">
                           <Link href="/collection/[slug]" as={`/collection/${slug.current}`}>
                             <div className="pointer">
                             {collectionTitle && <div className="collectionTitle">{collectionTitle}</div>}
                             {collectionDesc && <div className="collectionDesc">{collectionDesc}</div>}
                           </div>
                       </Link>
                      </div>
                      </If>
                      </>
                 
             ))
             }
                          </div>
             </div>
             </div>

          
      </div>
      
      
            ))}

      

      
      
    </div>
  )

}

export const getServerSideProps = async () => {
  const query = '*[ _type == "collectionspage"]{collections[]->}'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      },
    }
  } else {
    return {
      props: {
        properties,
      },
    }
  }
}

export default CollectionsPage