import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_b_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_hero_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_pages_b_hero_height" AS ENUM('full', 'half', 'compact');
  CREATE TYPE "public"."enum_pages_b_hero_background" AS ENUM('image', 'video', 'texture');
  CREATE TYPE "public"."enum_pages_b_hero_texture" AS ENUM('forest', 'ink', 'stone');
  CREATE TYPE "public"."enum_pages_b_hero_overlay" AS ENUM('gradient', 'scrim', 'strong', 'none');
  CREATE TYPE "public"."enum_pages_b_hero_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_b_txtmed_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_txtmed_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_b_txtmed_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_b_txtmed_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum_pages_b_txtmed_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum_pages_b_txtmed_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_txtmed_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_txtmed_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_cards_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_cards_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_b_cards_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_cards_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum_pages_b_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_b_cards_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum_pages_b_cards_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum_pages_b_cards_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_cards_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_feats_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum_pages_b_feats_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_feats_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_b_feats_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_feats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_b_feats_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum_pages_b_feats_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_feats_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_gal_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_gal_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum_pages_b_gal_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_b_gal_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_gal_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_tstm_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_tstm_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum_pages_b_tstm_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum_pages_b_tstm_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_tstm_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_faq_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_faq_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_faq_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_cta_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_pages_b_cta_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum_pages_b_cta_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_cta_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_form_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum_pages_b_form_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum_pages_b_form_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_form_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_gated_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_gated_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_gated_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_dls_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_dls_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum_pages_b_dls_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_pages_b_dls_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_dls_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_cont_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_b_cont_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_pages_b_cont_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_b_cont_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_pages_b_cont_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_cont_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_med_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_b_med_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_med_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_b_arch_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_pages_b_arch_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum_pages_b_arch_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_pages_b_arch_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_pages_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_height" AS ENUM('full', 'half', 'compact');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_background" AS ENUM('image', 'video', 'texture');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_texture" AS ENUM('forest', 'ink', 'stone');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_overlay" AS ENUM('gradient', 'scrim', 'strong', 'none');
  CREATE TYPE "public"."enum___pages_v_b_hero_v_align" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_txtmed_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_cards_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_feats_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_gal_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_gal_v_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum___pages_v_b_gal_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___pages_v_b_gal_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_gal_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_tstm_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_tstm_v_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum___pages_v_b_tstm_v_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum___pages_v_b_tstm_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_tstm_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_faq_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_faq_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_faq_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_cta_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_cta_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___pages_v_b_cta_v_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum___pages_v_b_cta_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_cta_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_form_v_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum___pages_v_b_form_v_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum___pages_v_b_form_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_form_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_gated_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_gated_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_gated_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_dls_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_dls_v_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum___pages_v_b_dls_v_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum___pages_v_b_dls_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_dls_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_cont_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_med_v_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum___pages_v_b_med_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_med_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___pages_v_b_arch_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___pages_v_b_arch_v_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum___pages_v_b_arch_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___pages_v_b_arch_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__pages_v_version_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_b_txtmed_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_txtmed_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_posts_b_txtmed_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_posts_b_txtmed_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum_posts_b_txtmed_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum_posts_b_txtmed_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_txtmed_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_txtmed_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_cards_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_cards_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_posts_b_cards_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_cards_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum_posts_b_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_b_cards_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum_posts_b_cards_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum_posts_b_cards_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_cards_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_feats_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum_posts_b_feats_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_feats_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_posts_b_feats_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_feats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_b_feats_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum_posts_b_feats_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_feats_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_gal_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_gal_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum_posts_b_gal_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_b_gal_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_gal_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_tstm_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_tstm_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum_posts_b_tstm_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum_posts_b_tstm_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_tstm_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_faq_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_faq_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_faq_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_cta_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_posts_b_cta_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum_posts_b_cta_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_cta_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_form_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum_posts_b_form_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum_posts_b_form_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_form_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_gated_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_gated_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_gated_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_dls_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_dls_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum_posts_b_dls_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_posts_b_dls_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_dls_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_cont_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_b_cont_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_posts_b_cont_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_b_cont_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_posts_b_cont_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_cont_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_med_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum_posts_b_med_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_med_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_b_arch_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_posts_b_arch_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum_posts_b_arch_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_posts_b_arch_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_posts_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_txtmed_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_cards_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_feats_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_gal_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_gal_v_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum___posts_v_b_gal_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___posts_v_b_gal_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_gal_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_tstm_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_tstm_v_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum___posts_v_b_tstm_v_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum___posts_v_b_tstm_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_tstm_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_faq_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_faq_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_faq_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_cta_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_cta_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___posts_v_b_cta_v_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum___posts_v_b_cta_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_cta_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_form_v_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum___posts_v_b_form_v_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum___posts_v_b_form_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_form_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_gated_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_gated_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_gated_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_dls_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_dls_v_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum___posts_v_b_dls_v_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum___posts_v_b_dls_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_dls_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_cont_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_med_v_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum___posts_v_b_med_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_med_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___posts_v_b_arch_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___posts_v_b_arch_v_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum___posts_v_b_arch_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___posts_v_b_arch_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__posts_v_version_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_b_txtmed_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_txtmed_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_services_b_txtmed_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_services_b_txtmed_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum_services_b_txtmed_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum_services_b_txtmed_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_txtmed_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_txtmed_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_cards_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_cards_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_services_b_cards_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_cards_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum_services_b_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_b_cards_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum_services_b_cards_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum_services_b_cards_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_cards_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_feats_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum_services_b_feats_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_feats_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_services_b_feats_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_feats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_b_feats_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum_services_b_feats_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_feats_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_gal_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_gal_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum_services_b_gal_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_b_gal_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_gal_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_tstm_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_tstm_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum_services_b_tstm_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum_services_b_tstm_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_tstm_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_faq_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_faq_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_faq_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_cta_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_services_b_cta_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum_services_b_cta_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_cta_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_form_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum_services_b_form_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum_services_b_form_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_form_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_gated_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_gated_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_gated_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_dls_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_dls_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum_services_b_dls_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_services_b_dls_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_dls_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_cont_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_services_b_cont_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_services_b_cont_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_services_b_cont_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_services_b_cont_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_cont_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_med_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum_services_b_med_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_med_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_b_arch_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_services_b_arch_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum_services_b_arch_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_services_b_arch_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('lightbulb', 'zap', 'leaf', 'shield', 'wrench', 'sparkles', 'droplet', 'home');
  CREATE TYPE "public"."enum_services_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_txtmed_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_cards_v_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_cards_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_cards_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___services_v_b_cards_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_cards_v_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum___services_v_b_cards_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___services_v_b_cards_v_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum___services_v_b_cards_v_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum___services_v_b_cards_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_cards_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_feats_v_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum___services_v_b_feats_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_feats_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___services_v_b_feats_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_feats_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___services_v_b_feats_v_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum___services_v_b_feats_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_feats_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_gal_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_gal_v_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum___services_v_b_gal_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___services_v_b_gal_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_gal_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_tstm_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_tstm_v_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum___services_v_b_tstm_v_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum___services_v_b_tstm_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_tstm_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_faq_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_faq_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_faq_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_cta_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_cta_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___services_v_b_cta_v_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum___services_v_b_cta_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_cta_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_form_v_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum___services_v_b_form_v_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum___services_v_b_form_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_form_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_gated_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_gated_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_gated_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_dls_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_dls_v_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum___services_v_b_dls_v_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum___services_v_b_dls_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_dls_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_cont_v_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum___services_v_b_cont_v_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum___services_v_b_cont_v_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___services_v_b_cont_v_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___services_v_b_cont_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_cont_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_med_v_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum___services_v_b_med_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_med_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___services_v_b_arch_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___services_v_b_arch_v_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum___services_v_b_arch_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___services_v_b_arch_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__services_v_version_icon" AS ENUM('lightbulb', 'zap', 'leaf', 'shield', 'wrench', 'sparkles', 'droplet', 'home');
  CREATE TYPE "public"."enum__services_v_version_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_txtmed_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_cards_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_cards_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_case_studies_b_cards_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_cards_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum_case_studies_b_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_case_studies_b_cards_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum_case_studies_b_cards_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum_case_studies_b_cards_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_cards_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_feats_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum_case_studies_b_feats_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_feats_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_case_studies_b_feats_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_feats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_case_studies_b_feats_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum_case_studies_b_feats_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_feats_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_gal_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_gal_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum_case_studies_b_gal_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_case_studies_b_gal_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_gal_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_tstm_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_tstm_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum_case_studies_b_tstm_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum_case_studies_b_tstm_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_tstm_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_faq_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_faq_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_faq_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_cta_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_case_studies_b_cta_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum_case_studies_b_cta_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_cta_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_form_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum_case_studies_b_form_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum_case_studies_b_form_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_form_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_gated_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_gated_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_gated_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_dls_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_dls_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum_case_studies_b_dls_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_case_studies_b_dls_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_dls_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_cont_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_case_studies_b_cont_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_case_studies_b_cont_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_case_studies_b_cont_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_case_studies_b_cont_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_cont_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_med_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum_case_studies_b_med_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_med_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_b_arch_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_case_studies_b_arch_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum_case_studies_b_arch_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_case_studies_b_arch_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_case_studies_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_case_studies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_txtmed_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_cards_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_feats_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_gal_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_gal_v_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum___case_studies_v_b_gal_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___case_studies_v_b_gal_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_gal_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_tstm_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_tstm_v_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum___case_studies_v_b_tstm_v_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum___case_studies_v_b_tstm_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_tstm_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_faq_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_faq_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_faq_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_cta_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_cta_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___case_studies_v_b_cta_v_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum___case_studies_v_b_cta_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_cta_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_form_v_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum___case_studies_v_b_form_v_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum___case_studies_v_b_form_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_form_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_gated_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_gated_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_gated_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_dls_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_dls_v_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum___case_studies_v_b_dls_v_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum___case_studies_v_b_dls_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_dls_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_cont_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_med_v_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum___case_studies_v_b_med_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_med_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___case_studies_v_b_arch_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___case_studies_v_b_arch_v_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum___case_studies_v_b_arch_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___case_studies_v_b_arch_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__case_studies_v_version_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum__case_studies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_locations_b_txtmed_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_txtmed_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_locations_b_txtmed_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_locations_b_txtmed_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum_locations_b_txtmed_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum_locations_b_txtmed_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_txtmed_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_txtmed_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_cards_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_cards_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_cards_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_locations_b_cards_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_cards_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum_locations_b_cards_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_locations_b_cards_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum_locations_b_cards_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum_locations_b_cards_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_cards_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_feats_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum_locations_b_feats_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_feats_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_locations_b_feats_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_feats_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_locations_b_feats_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum_locations_b_feats_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_feats_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_gal_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_gal_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum_locations_b_gal_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_locations_b_gal_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_gal_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_tstm_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_tstm_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum_locations_b_tstm_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum_locations_b_tstm_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_tstm_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_faq_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_faq_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_faq_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_cta_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum_locations_b_cta_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum_locations_b_cta_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_cta_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_form_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum_locations_b_form_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum_locations_b_form_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_form_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_gated_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_gated_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_gated_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_dls_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_dls_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum_locations_b_dls_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum_locations_b_dls_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_dls_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_cont_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_locations_b_cont_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum_locations_b_cont_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_locations_b_cont_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum_locations_b_cont_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_cont_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_med_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum_locations_b_med_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_med_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_b_arch_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum_locations_b_arch_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum_locations_b_arch_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum_locations_b_arch_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum_locations_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_locations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_media_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_media_ratio" AS ENUM('4/3', '3/2', '3/4', 'square', 'video');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_media_width" AS ENUM('half', 'mediaWide', 'textWide');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_txtmed_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_manual_cards_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_source" AS ENUM('collection', 'selection', 'manual');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_relation_to" AS ENUM('services', 'case-studies', 'posts', 'locations', 'team', 'downloads');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_card_style" AS ENUM('image', 'overlay', 'text');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_cards_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_features_icon" AS ENUM('check', 'shield', 'award', 'lightbulb', 'leaf', 'zap', 'clock', 'users', 'wrench', 'mapPin', 'sparkles', 'phone');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_links_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_style" AS ENUM('plain', 'card', 'numbered');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_feats_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_gal_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_gal_v_layout" AS ENUM('masonry', 'grid', 'editorial');
  CREATE TYPE "public"."enum___locations_v_b_gal_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum___locations_v_b_gal_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_gal_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_tstm_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_tstm_v_source" AS ENUM('latest', 'featured', 'selection');
  CREATE TYPE "public"."enum___locations_v_b_tstm_v_layout" AS ENUM('carousel', 'single', 'grid');
  CREATE TYPE "public"."enum___locations_v_b_tstm_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_tstm_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_faq_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_faq_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_faq_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_cta_v_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_cta_v_links_link_appearance" AS ENUM('accent', 'inverse', 'inverseOutline', 'default', 'outline');
  CREATE TYPE "public"."enum___locations_v_b_cta_v_layout" AS ENUM('split', 'centered', 'banner');
  CREATE TYPE "public"."enum___locations_v_b_cta_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_cta_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_form_v_layout" AS ENUM('single', 'steps');
  CREATE TYPE "public"."enum___locations_v_b_form_v_width" AS ENUM('narrow', 'full', 'split');
  CREATE TYPE "public"."enum___locations_v_b_form_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_form_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_gated_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_gated_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_gated_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_dls_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_dls_v_source" AS ENUM('selection', 'category');
  CREATE TYPE "public"."enum___locations_v_b_dls_v_layout" AS ENUM('list', 'cards');
  CREATE TYPE "public"."enum___locations_v_b_dls_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_dls_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_columns_measure" AS ENUM('prose', 'full');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_columns_link_appearance" AS ENUM('default', 'accent', 'outline', 'link');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_cont_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_med_v_size" AS ENUM('default', 'wide', 'full');
  CREATE TYPE "public"."enum___locations_v_b_med_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_med_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum___locations_v_b_arch_v_heading_level" AS ENUM('h2', 'h3', 'h4');
  CREATE TYPE "public"."enum___locations_v_b_arch_v_relation_to" AS ENUM('posts', 'case-studies', 'services', 'locations');
  CREATE TYPE "public"."enum___locations_v_b_arch_v_appearance_tone" AS ENUM('canvas', 'subtle', 'surface', 'brand', 'ink', 'accent');
  CREATE TYPE "public"."enum___locations_v_b_arch_v_appearance_spacing" AS ENUM('none', 'sm', 'md', 'lg');
  CREATE TYPE "public"."enum__locations_v_version_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum__locations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_testimonials_source" AS ENUM('direct', 'google', 'checkatrade', 'trustpilot', 'houzz', 'yell', 'other');
  CREATE TYPE "public"."enum_team_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_downloads_meta_priority" AS ENUM('1.0', '0.8', '0.7', '0.5', '0.3');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_header_nav_items_megamenu_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_megamenu_columns_source" AS ENUM('manual', 'services', 'locations');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'megamenu');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_megamenu_featured_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_ctas_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_ctas_link_appearance" AS ENUM('accent', 'default', 'outline');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_site_settings_opening_hours_days" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  CREATE TYPE "public"."enum_site_settings_social_profiles_platform" AS ENUM('instagram', 'facebook', 'linkedin', 'youtube', 'pinterest', 'houzz', 'google', 'checkatrade', 'trustpilot');
  CREATE TYPE "public"."enum_site_settings_price_range" AS ENUM('£', '££', '£££', '££££');
  CREATE TABLE "pages_b_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_b_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_hero_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_b_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"height" "enum_pages_b_hero_height" DEFAULT 'half',
  	"background" "enum_pages_b_hero_background" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_poster_id" integer,
  	"texture" "enum_pages_b_hero_texture" DEFAULT 'forest',
  	"overlay" "enum_pages_b_hero_overlay" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"align" "enum_pages_b_hero_align" DEFAULT 'left',
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_txtmed_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_b_txtmed_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_b_txtmed_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_txtmed_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_txtmed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_pages_b_txtmed_media_position" DEFAULT 'right',
  	"media_ratio" "enum_pages_b_txtmed_media_ratio" DEFAULT '4/3',
  	"media_width" "enum_pages_b_txtmed_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_txtmed_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum_pages_b_txtmed_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_txtmed_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_cards_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_pages_b_cards_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_b_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_b_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_cards_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_b_cards_source" DEFAULT 'collection',
  	"columns" "enum_pages_b_cards_columns" DEFAULT '3',
  	"relation_to" "enum_pages_b_cards_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum_pages_b_cards_card_style" DEFAULT 'image',
  	"appearance_tone" "enum_pages_b_cards_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_cards_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_feats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_b_feats_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_b_feats_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_b_feats_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_feats_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_feats_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_pages_b_feats_columns" DEFAULT '3',
  	"style" "enum_pages_b_feats_style" DEFAULT 'plain',
  	"appearance_tone" "enum_pages_b_feats_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_feats_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_gal_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean
  );
  
  CREATE TABLE "pages_b_gal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_gal_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_pages_b_gal_layout" DEFAULT 'masonry',
  	"columns" "enum_pages_b_gal_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum_pages_b_gal_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_gal_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_tstm_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_b_tstm_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum_pages_b_tstm_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum_pages_b_tstm_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_tstm_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_b_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_faq_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum_pages_b_faq_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_faq_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_b_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum_pages_b_cta_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum_pages_b_cta_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_cta_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_pages_b_form_layout" DEFAULT 'single',
  	"width" "enum_pages_b_form_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum_pages_b_form_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_form_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_gated_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_b_gated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_gated_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum_pages_b_gated_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_gated_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_dls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_dls_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_pages_b_dls_source" DEFAULT 'selection',
  	"layout" "enum_pages_b_dls_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum_pages_b_dls_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_dls_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_cont_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_b_cont_columns_size" DEFAULT 'full',
  	"measure" "enum_pages_b_cont_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_b_cont_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_b_cont_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_b_cont" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum_pages_b_cont_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_cont_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_med" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_pages_b_med_size" DEFAULT 'default',
  	"appearance_tone" "enum_pages_b_med_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_med_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_b_arch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_pages_b_arch_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum_pages_b_arch_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum_pages_b_arch_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_pages_b_arch_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_pages_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "__pages_v_b_hero_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_b_hero_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_hero_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_hero_v_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_hero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"height" "enum___pages_v_b_hero_v_height" DEFAULT 'half',
  	"background" "enum___pages_v_b_hero_v_background" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_poster_id" integer,
  	"texture" "enum___pages_v_b_hero_v_texture" DEFAULT 'forest',
  	"overlay" "enum___pages_v_b_hero_v_overlay" DEFAULT 'gradient',
  	"eyebrow" varchar,
  	"align" "enum___pages_v_b_hero_v_align" DEFAULT 'left',
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_txtmed_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_txtmed_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_b_txtmed_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_txtmed_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_txtmed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum___pages_v_b_txtmed_v_media_position" DEFAULT 'right',
  	"media_ratio" "enum___pages_v_b_txtmed_v_media_ratio" DEFAULT '4/3',
  	"media_width" "enum___pages_v_b_txtmed_v_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_txtmed_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum___pages_v_b_txtmed_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_txtmed_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_cards_v_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum___pages_v_b_cards_v_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_cards_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_b_cards_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_cards_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_cards_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___pages_v_b_cards_v_source" DEFAULT 'collection',
  	"columns" "enum___pages_v_b_cards_v_columns" DEFAULT '3',
  	"relation_to" "enum___pages_v_b_cards_v_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum___pages_v_b_cards_v_card_style" DEFAULT 'image',
  	"appearance_tone" "enum___pages_v_b_cards_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_cards_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_feats_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum___pages_v_b_feats_v_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_feats_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_b_feats_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_feats_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_feats_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum___pages_v_b_feats_v_columns" DEFAULT '3',
  	"style" "enum___pages_v_b_feats_v_style" DEFAULT 'plain',
  	"appearance_tone" "enum___pages_v_b_feats_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_feats_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_gal_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_gal_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_gal_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum___pages_v_b_gal_v_layout" DEFAULT 'masonry',
  	"columns" "enum___pages_v_b_gal_v_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum___pages_v_b_gal_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_gal_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_tstm_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_tstm_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___pages_v_b_tstm_v_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum___pages_v_b_tstm_v_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum___pages_v_b_tstm_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_tstm_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_faq_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_faq_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum___pages_v_b_faq_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_faq_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_cta_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___pages_v_b_cta_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_cta_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum___pages_v_b_cta_v_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum___pages_v_b_cta_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_cta_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_form_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum___pages_v_b_form_v_layout" DEFAULT 'single',
  	"width" "enum___pages_v_b_form_v_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum___pages_v_b_form_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_form_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_gated_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_gated_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_gated_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum___pages_v_b_gated_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_gated_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_dls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_dls_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___pages_v_b_dls_v_source" DEFAULT 'selection',
  	"layout" "enum___pages_v_b_dls_v_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum___pages_v_b_dls_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_dls_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_cont_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum___pages_v_b_cont_v_columns_size" DEFAULT 'full',
  	"measure" "enum___pages_v_b_cont_v_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum___pages_v_b_cont_v_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___pages_v_b_cont_v_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__pages_v_b_cont_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum___pages_v_b_cont_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_cont_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_med_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum___pages_v_b_med_v_size" DEFAULT 'default',
  	"appearance_tone" "enum___pages_v_b_med_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_med_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__pages_v_b_arch_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___pages_v_b_arch_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum___pages_v_b_arch_v_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum___pages_v_b_arch_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___pages_v_b_arch_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_noindex" boolean,
  	"version_meta_priority" "enum__pages_v_version_meta_priority" DEFAULT '0.7',
  	"version_meta_canonical_url" varchar,
  	"version_meta_summary" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "posts_b_txtmed_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_b_txtmed_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_b_txtmed_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_b_txtmed_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_b_txtmed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_posts_b_txtmed_media_position" DEFAULT 'right',
  	"media_ratio" "enum_posts_b_txtmed_media_ratio" DEFAULT '4/3',
  	"media_width" "enum_posts_b_txtmed_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_txtmed_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum_posts_b_txtmed_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_txtmed_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_cards_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_posts_b_cards_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "posts_b_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_b_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_b_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_b_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_cards_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_posts_b_cards_source" DEFAULT 'collection',
  	"columns" "enum_posts_b_cards_columns" DEFAULT '3',
  	"relation_to" "enum_posts_b_cards_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum_posts_b_cards_card_style" DEFAULT 'image',
  	"appearance_tone" "enum_posts_b_cards_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_cards_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_feats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_posts_b_feats_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_b_feats_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_b_feats_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_b_feats_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_b_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_feats_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_posts_b_feats_columns" DEFAULT '3',
  	"style" "enum_posts_b_feats_style" DEFAULT 'plain',
  	"appearance_tone" "enum_posts_b_feats_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_feats_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_gal_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean
  );
  
  CREATE TABLE "posts_b_gal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_gal_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_posts_b_gal_layout" DEFAULT 'masonry',
  	"columns" "enum_posts_b_gal_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum_posts_b_gal_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_gal_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_tstm_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_posts_b_tstm_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum_posts_b_tstm_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum_posts_b_tstm_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_tstm_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "posts_b_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_faq_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum_posts_b_faq_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_faq_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_b_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_b_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_b_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum_posts_b_cta_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum_posts_b_cta_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_cta_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_posts_b_form_layout" DEFAULT 'single',
  	"width" "enum_posts_b_form_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum_posts_b_form_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_form_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_gated_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_b_gated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_gated_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum_posts_b_gated_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_gated_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_dls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_dls_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_posts_b_dls_source" DEFAULT 'selection',
  	"layout" "enum_posts_b_dls_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum_posts_b_dls_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_dls_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_cont_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_posts_b_cont_columns_size" DEFAULT 'full',
  	"measure" "enum_posts_b_cont_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_posts_b_cont_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_b_cont_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_b_cont" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum_posts_b_cont_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_cont_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_med" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_posts_b_med_size" DEFAULT 'default',
  	"appearance_tone" "enum_posts_b_med_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_med_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_b_arch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_posts_b_arch_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum_posts_b_arch_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum_posts_b_arch_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_posts_b_arch_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_posts_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"published_at" timestamp(3) with time zone,
  	"reviewed_by_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "__posts_v_b_txtmed_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_txtmed_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___posts_v_b_txtmed_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___posts_v_b_txtmed_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_txtmed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum___posts_v_b_txtmed_v_media_position" DEFAULT 'right',
  	"media_ratio" "enum___posts_v_b_txtmed_v_media_ratio" DEFAULT '4/3',
  	"media_width" "enum___posts_v_b_txtmed_v_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_txtmed_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum___posts_v_b_txtmed_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_txtmed_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_cards_v_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum___posts_v_b_cards_v_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_cards_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___posts_v_b_cards_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___posts_v_b_cards_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_cards_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___posts_v_b_cards_v_source" DEFAULT 'collection',
  	"columns" "enum___posts_v_b_cards_v_columns" DEFAULT '3',
  	"relation_to" "enum___posts_v_b_cards_v_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum___posts_v_b_cards_v_card_style" DEFAULT 'image',
  	"appearance_tone" "enum___posts_v_b_cards_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_cards_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_feats_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum___posts_v_b_feats_v_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_feats_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___posts_v_b_feats_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___posts_v_b_feats_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_feats_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum___posts_v_b_feats_v_columns" DEFAULT '3',
  	"style" "enum___posts_v_b_feats_v_style" DEFAULT 'plain',
  	"appearance_tone" "enum___posts_v_b_feats_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_feats_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_gal_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_gal_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_gal_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum___posts_v_b_gal_v_layout" DEFAULT 'masonry',
  	"columns" "enum___posts_v_b_gal_v_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum___posts_v_b_gal_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_gal_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_tstm_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_tstm_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___posts_v_b_tstm_v_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum___posts_v_b_tstm_v_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum___posts_v_b_tstm_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_tstm_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_faq_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_faq_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum___posts_v_b_faq_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_faq_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_cta_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___posts_v_b_cta_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___posts_v_b_cta_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum___posts_v_b_cta_v_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum___posts_v_b_cta_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_cta_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_form_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum___posts_v_b_form_v_layout" DEFAULT 'single',
  	"width" "enum___posts_v_b_form_v_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum___posts_v_b_form_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_form_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_gated_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_gated_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_gated_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum___posts_v_b_gated_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_gated_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_dls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_dls_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___posts_v_b_dls_v_source" DEFAULT 'selection',
  	"layout" "enum___posts_v_b_dls_v_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum___posts_v_b_dls_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_dls_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_cont_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum___posts_v_b_cont_v_columns_size" DEFAULT 'full',
  	"measure" "enum___posts_v_b_cont_v_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum___posts_v_b_cont_v_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___posts_v_b_cont_v_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__posts_v_b_cont_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum___posts_v_b_cont_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_cont_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_med_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum___posts_v_b_med_v_size" DEFAULT 'default',
  	"appearance_tone" "enum___posts_v_b_med_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_med_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__posts_v_b_arch_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___posts_v_b_arch_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum___posts_v_b_arch_v_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum___posts_v_b_arch_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___posts_v_b_arch_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_noindex" boolean,
  	"version_meta_priority" "enum__posts_v_version_meta_priority" DEFAULT '0.7',
  	"version_meta_canonical_url" varchar,
  	"version_meta_summary" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_reviewed_by_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "services_b_txtmed_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_b_txtmed_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_b_txtmed_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_b_txtmed_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_b_txtmed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_services_b_txtmed_media_position" DEFAULT 'right',
  	"media_ratio" "enum_services_b_txtmed_media_ratio" DEFAULT '4/3',
  	"media_width" "enum_services_b_txtmed_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_txtmed_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum_services_b_txtmed_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_txtmed_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_cards_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_services_b_cards_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "services_b_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_b_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_b_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_b_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_cards_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_b_cards_source" DEFAULT 'collection',
  	"columns" "enum_services_b_cards_columns" DEFAULT '3',
  	"relation_to" "enum_services_b_cards_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum_services_b_cards_card_style" DEFAULT 'image',
  	"appearance_tone" "enum_services_b_cards_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_cards_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_feats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_services_b_feats_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "services_b_feats_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_b_feats_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_b_feats_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_b_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_feats_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_services_b_feats_columns" DEFAULT '3',
  	"style" "enum_services_b_feats_style" DEFAULT 'plain',
  	"appearance_tone" "enum_services_b_feats_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_feats_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_gal_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean
  );
  
  CREATE TABLE "services_b_gal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_gal_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_services_b_gal_layout" DEFAULT 'masonry',
  	"columns" "enum_services_b_gal_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum_services_b_gal_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_gal_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_tstm_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_b_tstm_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum_services_b_tstm_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum_services_b_tstm_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_tstm_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "services_b_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_faq_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum_services_b_faq_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_faq_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_b_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_b_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_b_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum_services_b_cta_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum_services_b_cta_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_cta_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_services_b_form_layout" DEFAULT 'single',
  	"width" "enum_services_b_form_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum_services_b_form_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_form_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_gated_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "services_b_gated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_gated_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum_services_b_gated_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_gated_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_dls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_dls_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_services_b_dls_source" DEFAULT 'selection',
  	"layout" "enum_services_b_dls_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum_services_b_dls_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_dls_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_cont_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_services_b_cont_columns_size" DEFAULT 'full',
  	"measure" "enum_services_b_cont_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_services_b_cont_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_b_cont_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_b_cont" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum_services_b_cont_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_cont_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_med" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_services_b_med_size" DEFAULT 'default',
  	"appearance_tone" "enum_services_b_med_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_med_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_b_arch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_services_b_arch_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum_services_b_arch_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum_services_b_arch_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_services_b_arch_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"short_description" varchar,
  	"featured_image_id" integer,
  	"icon" "enum_services_icon" DEFAULT 'zap',
  	"featured" boolean,
  	"parent_id" integer,
  	"price_from" numeric,
  	"price_note" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_services_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"published_at" timestamp(3) with time zone,
  	"order" numeric DEFAULT 0,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "__services_v_b_txtmed_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_txtmed_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___services_v_b_txtmed_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___services_v_b_txtmed_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_txtmed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum___services_v_b_txtmed_v_media_position" DEFAULT 'right',
  	"media_ratio" "enum___services_v_b_txtmed_v_media_ratio" DEFAULT '4/3',
  	"media_width" "enum___services_v_b_txtmed_v_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_txtmed_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum___services_v_b_txtmed_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_txtmed_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_cards_v_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum___services_v_b_cards_v_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_cards_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___services_v_b_cards_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___services_v_b_cards_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_cards_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___services_v_b_cards_v_source" DEFAULT 'collection',
  	"columns" "enum___services_v_b_cards_v_columns" DEFAULT '3',
  	"relation_to" "enum___services_v_b_cards_v_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum___services_v_b_cards_v_card_style" DEFAULT 'image',
  	"appearance_tone" "enum___services_v_b_cards_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_cards_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_feats_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum___services_v_b_feats_v_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_feats_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___services_v_b_feats_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___services_v_b_feats_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_feats_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum___services_v_b_feats_v_columns" DEFAULT '3',
  	"style" "enum___services_v_b_feats_v_style" DEFAULT 'plain',
  	"appearance_tone" "enum___services_v_b_feats_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_feats_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_gal_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_gal_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_gal_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum___services_v_b_gal_v_layout" DEFAULT 'masonry',
  	"columns" "enum___services_v_b_gal_v_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum___services_v_b_gal_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_gal_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_tstm_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_tstm_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___services_v_b_tstm_v_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum___services_v_b_tstm_v_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum___services_v_b_tstm_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_tstm_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_faq_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_faq_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum___services_v_b_faq_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_faq_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_cta_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___services_v_b_cta_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___services_v_b_cta_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum___services_v_b_cta_v_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum___services_v_b_cta_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_cta_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_form_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum___services_v_b_form_v_layout" DEFAULT 'single',
  	"width" "enum___services_v_b_form_v_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum___services_v_b_form_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_form_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_gated_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_gated_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_gated_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum___services_v_b_gated_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_gated_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_dls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_dls_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___services_v_b_dls_v_source" DEFAULT 'selection',
  	"layout" "enum___services_v_b_dls_v_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum___services_v_b_dls_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_dls_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_cont_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum___services_v_b_cont_v_columns_size" DEFAULT 'full',
  	"measure" "enum___services_v_b_cont_v_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum___services_v_b_cont_v_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___services_v_b_cont_v_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__services_v_b_cont_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum___services_v_b_cont_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_cont_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_med_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum___services_v_b_med_v_size" DEFAULT 'default',
  	"appearance_tone" "enum___services_v_b_med_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_med_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__services_v_b_arch_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___services_v_b_arch_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum___services_v_b_arch_v_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum___services_v_b_arch_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___services_v_b_arch_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v_version_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_short_description" varchar,
  	"version_featured_image_id" integer,
  	"version_icon" "enum__services_v_version_icon" DEFAULT 'zap',
  	"version_featured" boolean,
  	"version_parent_id" integer,
  	"version_price_from" numeric,
  	"version_price_note" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_noindex" boolean,
  	"version_meta_priority" "enum__services_v_version_meta_priority" DEFAULT '0.7',
  	"version_meta_canonical_url" varchar,
  	"version_meta_summary" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_order" numeric DEFAULT 0,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "case_studies_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "case_studies_b_txtmed_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "case_studies_b_txtmed_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_case_studies_b_txtmed_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_b_txtmed_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "case_studies_b_txtmed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_case_studies_b_txtmed_media_position" DEFAULT 'right',
  	"media_ratio" "enum_case_studies_b_txtmed_media_ratio" DEFAULT '4/3',
  	"media_width" "enum_case_studies_b_txtmed_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_txtmed_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum_case_studies_b_txtmed_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_txtmed_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_cards_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_case_studies_b_cards_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "case_studies_b_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_case_studies_b_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_b_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "case_studies_b_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_cards_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_b_cards_source" DEFAULT 'collection',
  	"columns" "enum_case_studies_b_cards_columns" DEFAULT '3',
  	"relation_to" "enum_case_studies_b_cards_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum_case_studies_b_cards_card_style" DEFAULT 'image',
  	"appearance_tone" "enum_case_studies_b_cards_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_cards_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_feats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_case_studies_b_feats_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "case_studies_b_feats_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_case_studies_b_feats_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_b_feats_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "case_studies_b_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_feats_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_case_studies_b_feats_columns" DEFAULT '3',
  	"style" "enum_case_studies_b_feats_style" DEFAULT 'plain',
  	"appearance_tone" "enum_case_studies_b_feats_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_feats_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_gal_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean
  );
  
  CREATE TABLE "case_studies_b_gal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_gal_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_case_studies_b_gal_layout" DEFAULT 'masonry',
  	"columns" "enum_case_studies_b_gal_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum_case_studies_b_gal_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_gal_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_tstm_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_b_tstm_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum_case_studies_b_tstm_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum_case_studies_b_tstm_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_tstm_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "case_studies_b_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_faq_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum_case_studies_b_faq_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_faq_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_case_studies_b_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_b_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "case_studies_b_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum_case_studies_b_cta_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum_case_studies_b_cta_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_cta_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_case_studies_b_form_layout" DEFAULT 'single',
  	"width" "enum_case_studies_b_form_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum_case_studies_b_form_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_form_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_gated_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "case_studies_b_gated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_gated_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum_case_studies_b_gated_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_gated_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_dls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_dls_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_case_studies_b_dls_source" DEFAULT 'selection',
  	"layout" "enum_case_studies_b_dls_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum_case_studies_b_dls_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_dls_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_cont_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_case_studies_b_cont_columns_size" DEFAULT 'full',
  	"measure" "enum_case_studies_b_cont_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_case_studies_b_cont_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_case_studies_b_cont_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "case_studies_b_cont" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum_case_studies_b_cont_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_cont_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_med" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_case_studies_b_med_size" DEFAULT 'default',
  	"appearance_tone" "enum_case_studies_b_med_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_med_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_b_arch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_case_studies_b_arch_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum_case_studies_b_arch_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum_case_studies_b_arch_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_case_studies_b_arch_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"featured_image_id" integer,
  	"client_location" varchar,
  	"completed_at" timestamp(3) with time zone,
  	"location_id" integer,
  	"testimonial_id" integer,
  	"challenge" varchar,
  	"approach" varchar,
  	"outcome" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_case_studies_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_case_studies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "case_studies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_case_studies_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_txtmed_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_txtmed_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___case_studies_v_b_txtmed_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___case_studies_v_b_txtmed_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_txtmed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum___case_studies_v_b_txtmed_v_media_position" DEFAULT 'right',
  	"media_ratio" "enum___case_studies_v_b_txtmed_v_media_ratio" DEFAULT '4/3',
  	"media_width" "enum___case_studies_v_b_txtmed_v_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_txtmed_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum___case_studies_v_b_txtmed_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_txtmed_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cards_v_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum___case_studies_v_b_cards_v_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cards_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___case_studies_v_b_cards_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___case_studies_v_b_cards_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_cards_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___case_studies_v_b_cards_v_source" DEFAULT 'collection',
  	"columns" "enum___case_studies_v_b_cards_v_columns" DEFAULT '3',
  	"relation_to" "enum___case_studies_v_b_cards_v_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum___case_studies_v_b_cards_v_card_style" DEFAULT 'image',
  	"appearance_tone" "enum___case_studies_v_b_cards_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_cards_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_feats_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum___case_studies_v_b_feats_v_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_feats_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___case_studies_v_b_feats_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___case_studies_v_b_feats_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_feats_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum___case_studies_v_b_feats_v_columns" DEFAULT '3',
  	"style" "enum___case_studies_v_b_feats_v_style" DEFAULT 'plain',
  	"appearance_tone" "enum___case_studies_v_b_feats_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_feats_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_gal_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_gal_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_gal_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum___case_studies_v_b_gal_v_layout" DEFAULT 'masonry',
  	"columns" "enum___case_studies_v_b_gal_v_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum___case_studies_v_b_gal_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_gal_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_tstm_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_tstm_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___case_studies_v_b_tstm_v_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum___case_studies_v_b_tstm_v_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum___case_studies_v_b_tstm_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_tstm_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_faq_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_faq_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum___case_studies_v_b_faq_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_faq_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cta_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___case_studies_v_b_cta_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___case_studies_v_b_cta_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum___case_studies_v_b_cta_v_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum___case_studies_v_b_cta_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_cta_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_form_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum___case_studies_v_b_form_v_layout" DEFAULT 'single',
  	"width" "enum___case_studies_v_b_form_v_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum___case_studies_v_b_form_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_form_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_gated_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_gated_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_gated_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum___case_studies_v_b_gated_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_gated_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_dls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_dls_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___case_studies_v_b_dls_v_source" DEFAULT 'selection',
  	"layout" "enum___case_studies_v_b_dls_v_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum___case_studies_v_b_dls_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_dls_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cont_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum___case_studies_v_b_cont_v_columns_size" DEFAULT 'full',
  	"measure" "enum___case_studies_v_b_cont_v_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum___case_studies_v_b_cont_v_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___case_studies_v_b_cont_v_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_cont_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum___case_studies_v_b_cont_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_cont_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_med_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum___case_studies_v_b_med_v_size" DEFAULT 'default',
  	"appearance_tone" "enum___case_studies_v_b_med_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_med_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__case_studies_v_b_arch_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___case_studies_v_b_arch_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum___case_studies_v_b_arch_v_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum___case_studies_v_b_arch_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___case_studies_v_b_arch_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_case_studies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_featured_image_id" integer,
  	"version_client_location" varchar,
  	"version_completed_at" timestamp(3) with time zone,
  	"version_location_id" integer,
  	"version_testimonial_id" integer,
  	"version_challenge" varchar,
  	"version_approach" varchar,
  	"version_outcome" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_noindex" boolean,
  	"version_meta_priority" "enum__case_studies_v_version_meta_priority" DEFAULT '0.7',
  	"version_meta_canonical_url" varchar,
  	"version_meta_summary" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__case_studies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_case_studies_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "locations_postcodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar
  );
  
  CREATE TABLE "locations_b_txtmed_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "locations_b_txtmed_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_locations_b_txtmed_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_b_txtmed_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_b_txtmed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_position" "enum_locations_b_txtmed_media_position" DEFAULT 'right',
  	"media_ratio" "enum_locations_b_txtmed_media_ratio" DEFAULT '4/3',
  	"media_width" "enum_locations_b_txtmed_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_txtmed_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum_locations_b_txtmed_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_txtmed_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_cards_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum_locations_b_cards_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "locations_b_cards_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_locations_b_cards_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_b_cards_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_b_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_cards_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_locations_b_cards_source" DEFAULT 'collection',
  	"columns" "enum_locations_b_cards_columns" DEFAULT '3',
  	"relation_to" "enum_locations_b_cards_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum_locations_b_cards_card_style" DEFAULT 'image',
  	"appearance_tone" "enum_locations_b_cards_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_cards_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_feats_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_locations_b_feats_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "locations_b_feats_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_locations_b_feats_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_b_feats_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_b_feats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_feats_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum_locations_b_feats_columns" DEFAULT '3',
  	"style" "enum_locations_b_feats_style" DEFAULT 'plain',
  	"appearance_tone" "enum_locations_b_feats_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_feats_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_gal_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean
  );
  
  CREATE TABLE "locations_b_gal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_gal_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum_locations_b_gal_layout" DEFAULT 'masonry',
  	"columns" "enum_locations_b_gal_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum_locations_b_gal_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_gal_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_tstm" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_tstm_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_locations_b_tstm_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum_locations_b_tstm_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum_locations_b_tstm_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_tstm_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "locations_b_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_faq_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum_locations_b_faq_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_faq_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_locations_b_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_b_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_b_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum_locations_b_cta_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum_locations_b_cta_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_cta_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum_locations_b_form_layout" DEFAULT 'single',
  	"width" "enum_locations_b_form_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum_locations_b_form_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_form_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_gated_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "locations_b_gated" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_gated_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum_locations_b_gated_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_gated_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_dls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_dls_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum_locations_b_dls_source" DEFAULT 'selection',
  	"layout" "enum_locations_b_dls_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum_locations_b_dls_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_dls_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_cont_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_locations_b_cont_columns_size" DEFAULT 'full',
  	"measure" "enum_locations_b_cont_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_locations_b_cont_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_locations_b_cont_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "locations_b_cont" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum_locations_b_cont_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_cont_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_med" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_locations_b_med_size" DEFAULT 'default',
  	"appearance_tone" "enum_locations_b_med_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_med_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations_b_arch" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum_locations_b_arch_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum_locations_b_arch_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum_locations_b_arch_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum_locations_b_arch_appearance_spacing" DEFAULT 'md',
  	"block_name" varchar
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"county" varchar,
  	"region" varchar,
  	"intro" varchar,
  	"featured_image_id" integer,
  	"latitude" numeric,
  	"longitude" numeric,
  	"service_radius_miles" numeric DEFAULT 15,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_locations_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_locations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "locations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "_locations_v_version_postcodes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_txtmed_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_txtmed_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___locations_v_b_txtmed_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___locations_v_b_txtmed_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_txtmed_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_position" "enum___locations_v_b_txtmed_v_media_position" DEFAULT 'right',
  	"media_ratio" "enum___locations_v_b_txtmed_v_media_ratio" DEFAULT '4/3',
  	"media_width" "enum___locations_v_b_txtmed_v_media_width" DEFAULT 'half',
  	"media_id" integer,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_txtmed_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"body" jsonb,
  	"appearance_tone" "enum___locations_v_b_txtmed_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_txtmed_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_cards_v_manual_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"enable_link" boolean,
  	"link_type" "enum___locations_v_b_cards_v_manual_cards_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_cards_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___locations_v_b_cards_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___locations_v_b_cards_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_cards_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_cards_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___locations_v_b_cards_v_source" DEFAULT 'collection',
  	"columns" "enum___locations_v_b_cards_v_columns" DEFAULT '3',
  	"relation_to" "enum___locations_v_b_cards_v_relation_to" DEFAULT 'services',
  	"limit" numeric DEFAULT 6,
  	"card_style" "enum___locations_v_b_cards_v_card_style" DEFAULT 'image',
  	"appearance_tone" "enum___locations_v_b_cards_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_cards_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_feats_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum___locations_v_b_feats_v_features_icon" DEFAULT 'check',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_feats_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___locations_v_b_feats_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___locations_v_b_feats_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_feats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_feats_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"columns" "enum___locations_v_b_feats_v_columns" DEFAULT '3',
  	"style" "enum___locations_v_b_feats_v_style" DEFAULT 'plain',
  	"appearance_tone" "enum___locations_v_b_feats_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_feats_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_gal_v_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"emphasis" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_gal_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_gal_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"layout" "enum___locations_v_b_gal_v_layout" DEFAULT 'masonry',
  	"columns" "enum___locations_v_b_gal_v_columns" DEFAULT '3',
  	"enable_lightbox" boolean DEFAULT true,
  	"appearance_tone" "enum___locations_v_b_gal_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_gal_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_tstm_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_tstm_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___locations_v_b_tstm_v_source" DEFAULT 'latest',
  	"limit" numeric DEFAULT 8,
  	"service_id" integer,
  	"layout" "enum___locations_v_b_tstm_v_layout" DEFAULT 'carousel',
  	"show_rating_summary" boolean DEFAULT true,
  	"appearance_tone" "enum___locations_v_b_tstm_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_tstm_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_faq_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_faq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_faq_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"emit_structured_data" boolean DEFAULT true,
  	"appearance_tone" "enum___locations_v_b_faq_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_faq_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_cta_v_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum___locations_v_b_cta_v_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___locations_v_b_cta_v_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_cta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"layout" "enum___locations_v_b_cta_v_layout" DEFAULT 'split',
  	"heading" varchar,
  	"body" varchar,
  	"background_image_id" integer,
  	"phone_cta" boolean DEFAULT false,
  	"appearance_tone" "enum___locations_v_b_cta_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_cta_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_form_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"layout" "enum___locations_v_b_form_v_layout" DEFAULT 'single',
  	"width" "enum___locations_v_b_form_v_width" DEFAULT 'narrow',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"appearance_tone" "enum___locations_v_b_form_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_form_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_gated_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_gated_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_gated_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"download_id" integer,
  	"cover_image_id" integer,
  	"submit_label" varchar DEFAULT 'Send me the guide',
  	"ask_name" boolean DEFAULT true,
  	"consent_text" jsonb,
  	"success_message" varchar DEFAULT 'Thanks — your download is ready.',
  	"appearance_tone" "enum___locations_v_b_gated_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_gated_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_dls_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_dls_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"source" "enum___locations_v_b_dls_v_source" DEFAULT 'selection',
  	"layout" "enum___locations_v_b_dls_v_layout" DEFAULT 'list',
  	"category_id" integer,
  	"limit" numeric DEFAULT 8,
  	"appearance_tone" "enum___locations_v_b_dls_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_dls_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_cont_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum___locations_v_b_cont_v_columns_size" DEFAULT 'full',
  	"measure" "enum___locations_v_b_cont_v_columns_measure" DEFAULT 'prose',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum___locations_v_b_cont_v_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum___locations_v_b_cont_v_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "__locations_v_b_cont_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"appearance_tone" "enum___locations_v_b_cont_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_cont_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_med_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum___locations_v_b_med_v_size" DEFAULT 'default',
  	"appearance_tone" "enum___locations_v_b_med_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_med_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "__locations_v_b_arch_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading_level" "enum___locations_v_b_arch_v_heading_level" DEFAULT 'h2',
  	"heading" varchar,
  	"intro" varchar,
  	"relation_to" "enum___locations_v_b_arch_v_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 12,
  	"appearance_tone" "enum___locations_v_b_arch_v_appearance_tone" DEFAULT 'canvas',
  	"appearance_spacing" "enum___locations_v_b_arch_v_appearance_spacing" DEFAULT 'md',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_locations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_county" varchar,
  	"version_region" varchar,
  	"version_intro" varchar,
  	"version_featured_image_id" integer,
  	"version_latitude" numeric,
  	"version_longitude" numeric,
  	"version_service_radius_miles" numeric DEFAULT 15,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_noindex" boolean,
  	"version_meta_priority" "enum__locations_v_version_meta_priority" DEFAULT '0.7',
  	"version_meta_canonical_url" varchar,
  	"version_meta_summary" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__locations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_locations_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locations_id" integer,
  	"services_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"case_studies_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"categories_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_location" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"review_date" timestamp(3) with time zone NOT NULL,
  	"source" "enum_testimonials_source" DEFAULT 'direct',
  	"author_photo_id" integer,
  	"project_image_id" integer,
  	"related_location_id" integer,
  	"featured" boolean,
  	"verified" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "team_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"issuer" varchar
  );
  
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"pronouns" varchar,
  	"photo_id" integer,
  	"short_bio" varchar,
  	"bio" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"linkedin" varchar,
  	"is_author" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_team_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"order" numeric DEFAULT 0,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "team_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category_id" integer,
  	"thumbnail_id" integer,
  	"gated" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_noindex" boolean,
  	"meta_priority" "enum_downloads_meta_priority" DEFAULT '0.7',
  	"meta_canonical_url" varchar,
  	"meta_summary" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "downloads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "download_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"download_id" integer NOT NULL,
  	"marketing_consent" boolean DEFAULT false,
  	"source_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"_objectkey" varchar,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_b_step" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_title" varchar NOT NULL,
  	"step_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"testimonials_id" integer,
  	"team_id" integer,
  	"downloads_id" integer,
  	"download_requests_id" integer,
  	"categories_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_megamenu_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_megamenu_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "header_nav_items_megamenu_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"source" "enum_header_nav_items_megamenu_columns_source" DEFAULT 'manual'
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"megamenu_description" varchar,
  	"megamenu_featured_enabled" boolean,
  	"megamenu_featured_image_id" integer,
  	"megamenu_featured_title" varchar,
  	"megamenu_featured_description" varchar,
  	"megamenu_featured_link_type" "enum_header_nav_items_megamenu_featured_link_type" DEFAULT 'reference',
  	"megamenu_featured_link_new_tab" boolean,
  	"megamenu_featured_link_url" varchar,
  	"megamenu_featured_link_label" varchar
  );
  
  CREATE TABLE "header_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_ctas_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_header_ctas_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"show_phone" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_legal_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_enabled" boolean DEFAULT true,
  	"newsletter_heading" varchar DEFAULT 'Garden lighting notes',
  	"newsletter_description" varchar DEFAULT 'Occasional design ideas, maintenance reminders and project photography. No more than once a month.',
  	"newsletter_form_id" integer,
  	"newsletter_consent_text" varchar DEFAULT 'We’ll only use your address for this newsletter. Unsubscribe any time.',
  	"show_accreditations" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"case_studies_id" integer,
  	"locations_id" integer,
  	"team_id" integer,
  	"downloads_id" integer
  );
  
  CREATE TABLE "site_settings_opening_hours_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_site_settings_opening_hours_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar,
  	"closes" varchar
  );
  
  CREATE TABLE "site_settings_accreditations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"registration_number" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "site_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_enquiry_recipients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"business_name" varchar DEFAULT 'Kingson Garden Electrical' NOT NULL,
  	"legal_name" varchar,
  	"tagline" varchar,
  	"description" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_mark_id" integer,
  	"founding_year" numeric,
  	"company_number" varchar,
  	"vat_number" varchar,
  	"phone" varchar NOT NULL,
  	"phone_e164" varchar,
  	"email" varchar NOT NULL,
  	"address_street_address" varchar,
  	"address_address_locality" varchar,
  	"address_address_region" varchar,
  	"address_postal_code" varchar,
  	"address_address_country" varchar DEFAULT 'GB',
  	"latitude" numeric,
  	"longitude" numeric,
  	"price_range" "enum_site_settings_price_range" DEFAULT '££',
  	"emergency_available" boolean,
  	"default_meta_image_id" integer,
  	"title_template" varchar DEFAULT '%s | Kingson Garden Electrical',
  	"llms_summary" varchar,
  	"allow_ai_training" boolean DEFAULT true,
  	"google_site_verification" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_b_hero_links" ADD CONSTRAINT "pages_b_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_hero_trust_signals" ADD CONSTRAINT "pages_b_hero_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_hero" ADD CONSTRAINT "pages_b_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_hero" ADD CONSTRAINT "pages_b_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_hero" ADD CONSTRAINT "pages_b_hero_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_hero" ADD CONSTRAINT "pages_b_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_txtmed_bullets" ADD CONSTRAINT "pages_b_txtmed_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_txtmed_links" ADD CONSTRAINT "pages_b_txtmed_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_txtmed" ADD CONSTRAINT "pages_b_txtmed_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_txtmed" ADD CONSTRAINT "pages_b_txtmed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cards_manual_cards" ADD CONSTRAINT "pages_b_cards_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_cards_manual_cards" ADD CONSTRAINT "pages_b_cards_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cards_links" ADD CONSTRAINT "pages_b_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cards" ADD CONSTRAINT "pages_b_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_feats_features" ADD CONSTRAINT "pages_b_feats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_feats_links" ADD CONSTRAINT "pages_b_feats_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_feats" ADD CONSTRAINT "pages_b_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_gal_images" ADD CONSTRAINT "pages_b_gal_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_gal_images" ADD CONSTRAINT "pages_b_gal_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_gal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_gal" ADD CONSTRAINT "pages_b_gal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_tstm" ADD CONSTRAINT "pages_b_tstm_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_tstm" ADD CONSTRAINT "pages_b_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_faq_items" ADD CONSTRAINT "pages_b_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_faq" ADD CONSTRAINT "pages_b_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cta_links" ADD CONSTRAINT "pages_b_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cta" ADD CONSTRAINT "pages_b_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_cta" ADD CONSTRAINT "pages_b_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_form" ADD CONSTRAINT "pages_b_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_form" ADD CONSTRAINT "pages_b_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_gated_bullets" ADD CONSTRAINT "pages_b_gated_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_gated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_gated" ADD CONSTRAINT "pages_b_gated_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_gated" ADD CONSTRAINT "pages_b_gated_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_gated" ADD CONSTRAINT "pages_b_gated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_dls" ADD CONSTRAINT "pages_b_dls_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_dls" ADD CONSTRAINT "pages_b_dls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cont_columns" ADD CONSTRAINT "pages_b_cont_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_b_cont"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_cont" ADD CONSTRAINT "pages_b_cont_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_med" ADD CONSTRAINT "pages_b_med_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_b_med" ADD CONSTRAINT "pages_b_med_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_b_arch" ADD CONSTRAINT "pages_b_arch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v_links" ADD CONSTRAINT "__pages_v_b_hero_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_hero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v_trust_signals" ADD CONSTRAINT "__pages_v_b_hero_v_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_hero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v" ADD CONSTRAINT "__pages_v_b_hero_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v" ADD CONSTRAINT "__pages_v_b_hero_v_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v" ADD CONSTRAINT "__pages_v_b_hero_v_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_hero_v" ADD CONSTRAINT "__pages_v_b_hero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_txtmed_v_bullets" ADD CONSTRAINT "__pages_v_b_txtmed_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_txtmed_v_links" ADD CONSTRAINT "__pages_v_b_txtmed_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_txtmed_v" ADD CONSTRAINT "__pages_v_b_txtmed_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_txtmed_v" ADD CONSTRAINT "__pages_v_b_txtmed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cards_v_manual_cards" ADD CONSTRAINT "__pages_v_b_cards_v_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cards_v_manual_cards" ADD CONSTRAINT "__pages_v_b_cards_v_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cards_v_links" ADD CONSTRAINT "__pages_v_b_cards_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cards_v" ADD CONSTRAINT "__pages_v_b_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_feats_v_features" ADD CONSTRAINT "__pages_v_b_feats_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_feats_v_links" ADD CONSTRAINT "__pages_v_b_feats_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_feats_v" ADD CONSTRAINT "__pages_v_b_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gal_v_images" ADD CONSTRAINT "__pages_v_b_gal_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gal_v_images" ADD CONSTRAINT "__pages_v_b_gal_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_gal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gal_v" ADD CONSTRAINT "__pages_v_b_gal_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_tstm_v" ADD CONSTRAINT "__pages_v_b_tstm_v_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_tstm_v" ADD CONSTRAINT "__pages_v_b_tstm_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_faq_v_items" ADD CONSTRAINT "__pages_v_b_faq_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_faq_v" ADD CONSTRAINT "__pages_v_b_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cta_v_links" ADD CONSTRAINT "__pages_v_b_cta_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cta_v" ADD CONSTRAINT "__pages_v_b_cta_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cta_v" ADD CONSTRAINT "__pages_v_b_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_form_v" ADD CONSTRAINT "__pages_v_b_form_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_form_v" ADD CONSTRAINT "__pages_v_b_form_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gated_v_bullets" ADD CONSTRAINT "__pages_v_b_gated_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_gated_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gated_v" ADD CONSTRAINT "__pages_v_b_gated_v_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gated_v" ADD CONSTRAINT "__pages_v_b_gated_v_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_gated_v" ADD CONSTRAINT "__pages_v_b_gated_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_dls_v" ADD CONSTRAINT "__pages_v_b_dls_v_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_dls_v" ADD CONSTRAINT "__pages_v_b_dls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cont_v_columns" ADD CONSTRAINT "__pages_v_b_cont_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__pages_v_b_cont_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_cont_v" ADD CONSTRAINT "__pages_v_b_cont_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_med_v" ADD CONSTRAINT "__pages_v_b_med_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__pages_v_b_med_v" ADD CONSTRAINT "__pages_v_b_med_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__pages_v_b_arch_v" ADD CONSTRAINT "__pages_v_b_arch_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_txtmed_bullets" ADD CONSTRAINT "posts_b_txtmed_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_txtmed_links" ADD CONSTRAINT "posts_b_txtmed_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_txtmed" ADD CONSTRAINT "posts_b_txtmed_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_txtmed" ADD CONSTRAINT "posts_b_txtmed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cards_manual_cards" ADD CONSTRAINT "posts_b_cards_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_cards_manual_cards" ADD CONSTRAINT "posts_b_cards_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cards_links" ADD CONSTRAINT "posts_b_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cards" ADD CONSTRAINT "posts_b_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_feats_features" ADD CONSTRAINT "posts_b_feats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_feats_links" ADD CONSTRAINT "posts_b_feats_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_feats" ADD CONSTRAINT "posts_b_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_gal_images" ADD CONSTRAINT "posts_b_gal_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_gal_images" ADD CONSTRAINT "posts_b_gal_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_gal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_gal" ADD CONSTRAINT "posts_b_gal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_tstm" ADD CONSTRAINT "posts_b_tstm_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_tstm" ADD CONSTRAINT "posts_b_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_faq_items" ADD CONSTRAINT "posts_b_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_faq" ADD CONSTRAINT "posts_b_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cta_links" ADD CONSTRAINT "posts_b_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cta" ADD CONSTRAINT "posts_b_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_cta" ADD CONSTRAINT "posts_b_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_form" ADD CONSTRAINT "posts_b_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_form" ADD CONSTRAINT "posts_b_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_gated_bullets" ADD CONSTRAINT "posts_b_gated_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_gated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_gated" ADD CONSTRAINT "posts_b_gated_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_gated" ADD CONSTRAINT "posts_b_gated_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_gated" ADD CONSTRAINT "posts_b_gated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_dls" ADD CONSTRAINT "posts_b_dls_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_dls" ADD CONSTRAINT "posts_b_dls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cont_columns" ADD CONSTRAINT "posts_b_cont_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_b_cont"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_cont" ADD CONSTRAINT "posts_b_cont_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_med" ADD CONSTRAINT "posts_b_med_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_b_med" ADD CONSTRAINT "posts_b_med_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_b_arch" ADD CONSTRAINT "posts_b_arch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_reviewed_by_id_team_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_txtmed_v_bullets" ADD CONSTRAINT "__posts_v_b_txtmed_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_txtmed_v_links" ADD CONSTRAINT "__posts_v_b_txtmed_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_txtmed_v" ADD CONSTRAINT "__posts_v_b_txtmed_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_txtmed_v" ADD CONSTRAINT "__posts_v_b_txtmed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cards_v_manual_cards" ADD CONSTRAINT "__posts_v_b_cards_v_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cards_v_manual_cards" ADD CONSTRAINT "__posts_v_b_cards_v_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cards_v_links" ADD CONSTRAINT "__posts_v_b_cards_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cards_v" ADD CONSTRAINT "__posts_v_b_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_feats_v_features" ADD CONSTRAINT "__posts_v_b_feats_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_feats_v_links" ADD CONSTRAINT "__posts_v_b_feats_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_feats_v" ADD CONSTRAINT "__posts_v_b_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gal_v_images" ADD CONSTRAINT "__posts_v_b_gal_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gal_v_images" ADD CONSTRAINT "__posts_v_b_gal_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_gal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gal_v" ADD CONSTRAINT "__posts_v_b_gal_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_tstm_v" ADD CONSTRAINT "__posts_v_b_tstm_v_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_tstm_v" ADD CONSTRAINT "__posts_v_b_tstm_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_faq_v_items" ADD CONSTRAINT "__posts_v_b_faq_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_faq_v" ADD CONSTRAINT "__posts_v_b_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cta_v_links" ADD CONSTRAINT "__posts_v_b_cta_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cta_v" ADD CONSTRAINT "__posts_v_b_cta_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cta_v" ADD CONSTRAINT "__posts_v_b_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_form_v" ADD CONSTRAINT "__posts_v_b_form_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_form_v" ADD CONSTRAINT "__posts_v_b_form_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gated_v_bullets" ADD CONSTRAINT "__posts_v_b_gated_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_gated_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gated_v" ADD CONSTRAINT "__posts_v_b_gated_v_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gated_v" ADD CONSTRAINT "__posts_v_b_gated_v_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_gated_v" ADD CONSTRAINT "__posts_v_b_gated_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_dls_v" ADD CONSTRAINT "__posts_v_b_dls_v_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_dls_v" ADD CONSTRAINT "__posts_v_b_dls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cont_v_columns" ADD CONSTRAINT "__posts_v_b_cont_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__posts_v_b_cont_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_cont_v" ADD CONSTRAINT "__posts_v_b_cont_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_med_v" ADD CONSTRAINT "__posts_v_b_med_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__posts_v_b_med_v" ADD CONSTRAINT "__posts_v_b_med_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__posts_v_b_arch_v" ADD CONSTRAINT "__posts_v_b_arch_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_reviewed_by_id_team_id_fk" FOREIGN KEY ("version_reviewed_by_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_txtmed_bullets" ADD CONSTRAINT "services_b_txtmed_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_txtmed_links" ADD CONSTRAINT "services_b_txtmed_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_txtmed" ADD CONSTRAINT "services_b_txtmed_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_txtmed" ADD CONSTRAINT "services_b_txtmed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cards_manual_cards" ADD CONSTRAINT "services_b_cards_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_cards_manual_cards" ADD CONSTRAINT "services_b_cards_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cards_links" ADD CONSTRAINT "services_b_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cards" ADD CONSTRAINT "services_b_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_feats_features" ADD CONSTRAINT "services_b_feats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_feats_links" ADD CONSTRAINT "services_b_feats_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_feats" ADD CONSTRAINT "services_b_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_gal_images" ADD CONSTRAINT "services_b_gal_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_gal_images" ADD CONSTRAINT "services_b_gal_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_gal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_gal" ADD CONSTRAINT "services_b_gal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_tstm" ADD CONSTRAINT "services_b_tstm_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_tstm" ADD CONSTRAINT "services_b_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_faq_items" ADD CONSTRAINT "services_b_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_faq" ADD CONSTRAINT "services_b_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cta_links" ADD CONSTRAINT "services_b_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cta" ADD CONSTRAINT "services_b_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_cta" ADD CONSTRAINT "services_b_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_form" ADD CONSTRAINT "services_b_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_form" ADD CONSTRAINT "services_b_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_gated_bullets" ADD CONSTRAINT "services_b_gated_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_gated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_gated" ADD CONSTRAINT "services_b_gated_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_gated" ADD CONSTRAINT "services_b_gated_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_gated" ADD CONSTRAINT "services_b_gated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_dls" ADD CONSTRAINT "services_b_dls_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_dls" ADD CONSTRAINT "services_b_dls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cont_columns" ADD CONSTRAINT "services_b_cont_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_b_cont"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_cont" ADD CONSTRAINT "services_b_cont_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_med" ADD CONSTRAINT "services_b_med_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_b_med" ADD CONSTRAINT "services_b_med_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_b_arch" ADD CONSTRAINT "services_b_arch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_txtmed_v_bullets" ADD CONSTRAINT "__services_v_b_txtmed_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_txtmed_v_links" ADD CONSTRAINT "__services_v_b_txtmed_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_txtmed_v" ADD CONSTRAINT "__services_v_b_txtmed_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_txtmed_v" ADD CONSTRAINT "__services_v_b_txtmed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cards_v_manual_cards" ADD CONSTRAINT "__services_v_b_cards_v_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_cards_v_manual_cards" ADD CONSTRAINT "__services_v_b_cards_v_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cards_v_links" ADD CONSTRAINT "__services_v_b_cards_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cards_v" ADD CONSTRAINT "__services_v_b_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_feats_v_features" ADD CONSTRAINT "__services_v_b_feats_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_feats_v_links" ADD CONSTRAINT "__services_v_b_feats_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_feats_v" ADD CONSTRAINT "__services_v_b_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_gal_v_images" ADD CONSTRAINT "__services_v_b_gal_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_gal_v_images" ADD CONSTRAINT "__services_v_b_gal_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_gal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_gal_v" ADD CONSTRAINT "__services_v_b_gal_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_tstm_v" ADD CONSTRAINT "__services_v_b_tstm_v_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_tstm_v" ADD CONSTRAINT "__services_v_b_tstm_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_faq_v_items" ADD CONSTRAINT "__services_v_b_faq_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_faq_v" ADD CONSTRAINT "__services_v_b_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cta_v_links" ADD CONSTRAINT "__services_v_b_cta_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cta_v" ADD CONSTRAINT "__services_v_b_cta_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_cta_v" ADD CONSTRAINT "__services_v_b_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_form_v" ADD CONSTRAINT "__services_v_b_form_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_form_v" ADD CONSTRAINT "__services_v_b_form_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_gated_v_bullets" ADD CONSTRAINT "__services_v_b_gated_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_gated_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_gated_v" ADD CONSTRAINT "__services_v_b_gated_v_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_gated_v" ADD CONSTRAINT "__services_v_b_gated_v_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_gated_v" ADD CONSTRAINT "__services_v_b_gated_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_dls_v" ADD CONSTRAINT "__services_v_b_dls_v_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_dls_v" ADD CONSTRAINT "__services_v_b_dls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cont_v_columns" ADD CONSTRAINT "__services_v_b_cont_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__services_v_b_cont_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_cont_v" ADD CONSTRAINT "__services_v_b_cont_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_med_v" ADD CONSTRAINT "__services_v_b_med_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__services_v_b_med_v" ADD CONSTRAINT "__services_v_b_med_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__services_v_b_arch_v" ADD CONSTRAINT "__services_v_b_arch_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_deliverables" ADD CONSTRAINT "_services_v_version_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_parent_id_services_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_stats" ADD CONSTRAINT "case_studies_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_txtmed_bullets" ADD CONSTRAINT "case_studies_b_txtmed_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_txtmed_links" ADD CONSTRAINT "case_studies_b_txtmed_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_txtmed" ADD CONSTRAINT "case_studies_b_txtmed_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_txtmed" ADD CONSTRAINT "case_studies_b_txtmed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cards_manual_cards" ADD CONSTRAINT "case_studies_b_cards_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_cards_manual_cards" ADD CONSTRAINT "case_studies_b_cards_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cards_links" ADD CONSTRAINT "case_studies_b_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cards" ADD CONSTRAINT "case_studies_b_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_feats_features" ADD CONSTRAINT "case_studies_b_feats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_feats_links" ADD CONSTRAINT "case_studies_b_feats_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_feats" ADD CONSTRAINT "case_studies_b_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_gal_images" ADD CONSTRAINT "case_studies_b_gal_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_gal_images" ADD CONSTRAINT "case_studies_b_gal_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_gal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_gal" ADD CONSTRAINT "case_studies_b_gal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_tstm" ADD CONSTRAINT "case_studies_b_tstm_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_tstm" ADD CONSTRAINT "case_studies_b_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_faq_items" ADD CONSTRAINT "case_studies_b_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_faq" ADD CONSTRAINT "case_studies_b_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cta_links" ADD CONSTRAINT "case_studies_b_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cta" ADD CONSTRAINT "case_studies_b_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_cta" ADD CONSTRAINT "case_studies_b_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_form" ADD CONSTRAINT "case_studies_b_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_form" ADD CONSTRAINT "case_studies_b_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_gated_bullets" ADD CONSTRAINT "case_studies_b_gated_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_gated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_gated" ADD CONSTRAINT "case_studies_b_gated_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_gated" ADD CONSTRAINT "case_studies_b_gated_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_gated" ADD CONSTRAINT "case_studies_b_gated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_dls" ADD CONSTRAINT "case_studies_b_dls_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_dls" ADD CONSTRAINT "case_studies_b_dls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cont_columns" ADD CONSTRAINT "case_studies_b_cont_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies_b_cont"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_cont" ADD CONSTRAINT "case_studies_b_cont_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_med" ADD CONSTRAINT "case_studies_b_med_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_b_med" ADD CONSTRAINT "case_studies_b_med_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_b_arch" ADD CONSTRAINT "case_studies_b_arch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_testimonial_id_testimonials_id_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_rels" ADD CONSTRAINT "case_studies_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_version_stats" ADD CONSTRAINT "_case_studies_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_txtmed_v_bullets" ADD CONSTRAINT "__case_studies_v_b_txtmed_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_txtmed_v_links" ADD CONSTRAINT "__case_studies_v_b_txtmed_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_txtmed_v" ADD CONSTRAINT "__case_studies_v_b_txtmed_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_txtmed_v" ADD CONSTRAINT "__case_studies_v_b_txtmed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cards_v_manual_cards" ADD CONSTRAINT "__case_studies_v_b_cards_v_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cards_v_manual_cards" ADD CONSTRAINT "__case_studies_v_b_cards_v_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cards_v_links" ADD CONSTRAINT "__case_studies_v_b_cards_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cards_v" ADD CONSTRAINT "__case_studies_v_b_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_feats_v_features" ADD CONSTRAINT "__case_studies_v_b_feats_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_feats_v_links" ADD CONSTRAINT "__case_studies_v_b_feats_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_feats_v" ADD CONSTRAINT "__case_studies_v_b_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gal_v_images" ADD CONSTRAINT "__case_studies_v_b_gal_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gal_v_images" ADD CONSTRAINT "__case_studies_v_b_gal_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_gal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gal_v" ADD CONSTRAINT "__case_studies_v_b_gal_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_tstm_v" ADD CONSTRAINT "__case_studies_v_b_tstm_v_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_tstm_v" ADD CONSTRAINT "__case_studies_v_b_tstm_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_faq_v_items" ADD CONSTRAINT "__case_studies_v_b_faq_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_faq_v" ADD CONSTRAINT "__case_studies_v_b_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cta_v_links" ADD CONSTRAINT "__case_studies_v_b_cta_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cta_v" ADD CONSTRAINT "__case_studies_v_b_cta_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cta_v" ADD CONSTRAINT "__case_studies_v_b_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_form_v" ADD CONSTRAINT "__case_studies_v_b_form_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_form_v" ADD CONSTRAINT "__case_studies_v_b_form_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gated_v_bullets" ADD CONSTRAINT "__case_studies_v_b_gated_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_gated_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gated_v" ADD CONSTRAINT "__case_studies_v_b_gated_v_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gated_v" ADD CONSTRAINT "__case_studies_v_b_gated_v_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_gated_v" ADD CONSTRAINT "__case_studies_v_b_gated_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_dls_v" ADD CONSTRAINT "__case_studies_v_b_dls_v_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_dls_v" ADD CONSTRAINT "__case_studies_v_b_dls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cont_v_columns" ADD CONSTRAINT "__case_studies_v_b_cont_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__case_studies_v_b_cont_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_cont_v" ADD CONSTRAINT "__case_studies_v_b_cont_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_med_v" ADD CONSTRAINT "__case_studies_v_b_med_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_med_v" ADD CONSTRAINT "__case_studies_v_b_med_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__case_studies_v_b_arch_v" ADD CONSTRAINT "__case_studies_v_b_arch_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_parent_id_case_studies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_location_id_locations_id_fk" FOREIGN KEY ("version_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_testimonial_id_testimonials_id_fk" FOREIGN KEY ("version_testimonial_id") REFERENCES "public"."testimonials"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v" ADD CONSTRAINT "_case_studies_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_case_studies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_case_studies_v_rels" ADD CONSTRAINT "_case_studies_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_postcodes" ADD CONSTRAINT "locations_postcodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_txtmed_bullets" ADD CONSTRAINT "locations_b_txtmed_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_txtmed_links" ADD CONSTRAINT "locations_b_txtmed_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_txtmed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_txtmed" ADD CONSTRAINT "locations_b_txtmed_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_txtmed" ADD CONSTRAINT "locations_b_txtmed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cards_manual_cards" ADD CONSTRAINT "locations_b_cards_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_cards_manual_cards" ADD CONSTRAINT "locations_b_cards_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cards_links" ADD CONSTRAINT "locations_b_cards_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cards" ADD CONSTRAINT "locations_b_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_feats_features" ADD CONSTRAINT "locations_b_feats_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_feats_links" ADD CONSTRAINT "locations_b_feats_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_feats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_feats" ADD CONSTRAINT "locations_b_feats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_gal_images" ADD CONSTRAINT "locations_b_gal_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_gal_images" ADD CONSTRAINT "locations_b_gal_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_gal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_gal" ADD CONSTRAINT "locations_b_gal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_tstm" ADD CONSTRAINT "locations_b_tstm_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_tstm" ADD CONSTRAINT "locations_b_tstm_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_faq_items" ADD CONSTRAINT "locations_b_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_faq" ADD CONSTRAINT "locations_b_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cta_links" ADD CONSTRAINT "locations_b_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cta" ADD CONSTRAINT "locations_b_cta_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_cta" ADD CONSTRAINT "locations_b_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_form" ADD CONSTRAINT "locations_b_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_form" ADD CONSTRAINT "locations_b_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_gated_bullets" ADD CONSTRAINT "locations_b_gated_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_gated"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_gated" ADD CONSTRAINT "locations_b_gated_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_gated" ADD CONSTRAINT "locations_b_gated_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_gated" ADD CONSTRAINT "locations_b_gated_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_dls" ADD CONSTRAINT "locations_b_dls_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_dls" ADD CONSTRAINT "locations_b_dls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cont_columns" ADD CONSTRAINT "locations_b_cont_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations_b_cont"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_cont" ADD CONSTRAINT "locations_b_cont_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_med" ADD CONSTRAINT "locations_b_med_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_b_med" ADD CONSTRAINT "locations_b_med_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_b_arch" ADD CONSTRAINT "locations_b_arch_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_version_postcodes" ADD CONSTRAINT "_locations_v_version_postcodes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_txtmed_v_bullets" ADD CONSTRAINT "__locations_v_b_txtmed_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_txtmed_v_links" ADD CONSTRAINT "__locations_v_b_txtmed_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_txtmed_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_txtmed_v" ADD CONSTRAINT "__locations_v_b_txtmed_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_txtmed_v" ADD CONSTRAINT "__locations_v_b_txtmed_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cards_v_manual_cards" ADD CONSTRAINT "__locations_v_b_cards_v_manual_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cards_v_manual_cards" ADD CONSTRAINT "__locations_v_b_cards_v_manual_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cards_v_links" ADD CONSTRAINT "__locations_v_b_cards_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_cards_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cards_v" ADD CONSTRAINT "__locations_v_b_cards_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_feats_v_features" ADD CONSTRAINT "__locations_v_b_feats_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_feats_v_links" ADD CONSTRAINT "__locations_v_b_feats_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_feats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_feats_v" ADD CONSTRAINT "__locations_v_b_feats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gal_v_images" ADD CONSTRAINT "__locations_v_b_gal_v_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gal_v_images" ADD CONSTRAINT "__locations_v_b_gal_v_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_gal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gal_v" ADD CONSTRAINT "__locations_v_b_gal_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_tstm_v" ADD CONSTRAINT "__locations_v_b_tstm_v_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_tstm_v" ADD CONSTRAINT "__locations_v_b_tstm_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_faq_v_items" ADD CONSTRAINT "__locations_v_b_faq_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_faq_v" ADD CONSTRAINT "__locations_v_b_faq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cta_v_links" ADD CONSTRAINT "__locations_v_b_cta_v_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_cta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cta_v" ADD CONSTRAINT "__locations_v_b_cta_v_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cta_v" ADD CONSTRAINT "__locations_v_b_cta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_form_v" ADD CONSTRAINT "__locations_v_b_form_v_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_form_v" ADD CONSTRAINT "__locations_v_b_form_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gated_v_bullets" ADD CONSTRAINT "__locations_v_b_gated_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_gated_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gated_v" ADD CONSTRAINT "__locations_v_b_gated_v_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gated_v" ADD CONSTRAINT "__locations_v_b_gated_v_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_gated_v" ADD CONSTRAINT "__locations_v_b_gated_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_dls_v" ADD CONSTRAINT "__locations_v_b_dls_v_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_dls_v" ADD CONSTRAINT "__locations_v_b_dls_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cont_v_columns" ADD CONSTRAINT "__locations_v_b_cont_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."__locations_v_b_cont_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_cont_v" ADD CONSTRAINT "__locations_v_b_cont_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_med_v" ADD CONSTRAINT "__locations_v_b_med_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "__locations_v_b_med_v" ADD CONSTRAINT "__locations_v_b_med_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "__locations_v_b_arch_v" ADD CONSTRAINT "__locations_v_b_arch_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v" ADD CONSTRAINT "_locations_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_locations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_locations_v_rels" ADD CONSTRAINT "_locations_v_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_author_photo_id_media_id_fk" FOREIGN KEY ("author_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_image_id_media_id_fk" FOREIGN KEY ("project_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_related_location_id_locations_id_fk" FOREIGN KEY ("related_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_rels" ADD CONSTRAINT "testimonials_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_qualifications" ADD CONSTRAINT "team_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_rels" ADD CONSTRAINT "team_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_rels" ADD CONSTRAINT "team_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "downloads_rels" ADD CONSTRAINT "downloads_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "download_requests" ADD CONSTRAINT "download_requests_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_b_step" ADD CONSTRAINT "forms_b_step_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_download_requests_fk" FOREIGN KEY ("download_requests_id") REFERENCES "public"."download_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_megamenu_columns_links" ADD CONSTRAINT "header_nav_items_megamenu_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_megamenu_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_megamenu_columns" ADD CONSTRAINT "header_nav_items_megamenu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_megamenu_featured_image_id_media_id_fk" FOREIGN KEY ("megamenu_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_ctas" ADD CONSTRAINT "header_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_newsletter_form_id_forms_id_fk" FOREIGN KEY ("newsletter_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours_days" ADD CONSTRAINT "site_settings_opening_hours_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings_opening_hours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours" ADD CONSTRAINT "site_settings_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_accreditations" ADD CONSTRAINT "site_settings_accreditations_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_accreditations" ADD CONSTRAINT "site_settings_accreditations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_profiles" ADD CONSTRAINT "site_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_enquiry_recipients" ADD CONSTRAINT "site_settings_enquiry_recipients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_mark_id_media_id_fk" FOREIGN KEY ("logo_mark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_meta_image_id_media_id_fk" FOREIGN KEY ("default_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_b_hero_links_order_idx" ON "pages_b_hero_links" USING btree ("_order");
  CREATE INDEX "pages_b_hero_links_parent_id_idx" ON "pages_b_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_b_hero_trust_signals_order_idx" ON "pages_b_hero_trust_signals" USING btree ("_order");
  CREATE INDEX "pages_b_hero_trust_signals_parent_id_idx" ON "pages_b_hero_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "pages_b_hero_order_idx" ON "pages_b_hero" USING btree ("_order");
  CREATE INDEX "pages_b_hero_parent_id_idx" ON "pages_b_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_b_hero_path_idx" ON "pages_b_hero" USING btree ("_path");
  CREATE INDEX "pages_b_hero_image_idx" ON "pages_b_hero" USING btree ("image_id");
  CREATE INDEX "pages_b_hero_video_idx" ON "pages_b_hero" USING btree ("video_id");
  CREATE INDEX "pages_b_hero_video_poster_idx" ON "pages_b_hero" USING btree ("video_poster_id");
  CREATE INDEX "pages_b_txtmed_bullets_order_idx" ON "pages_b_txtmed_bullets" USING btree ("_order");
  CREATE INDEX "pages_b_txtmed_bullets_parent_id_idx" ON "pages_b_txtmed_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_b_txtmed_links_order_idx" ON "pages_b_txtmed_links" USING btree ("_order");
  CREATE INDEX "pages_b_txtmed_links_parent_id_idx" ON "pages_b_txtmed_links" USING btree ("_parent_id");
  CREATE INDEX "pages_b_txtmed_order_idx" ON "pages_b_txtmed" USING btree ("_order");
  CREATE INDEX "pages_b_txtmed_parent_id_idx" ON "pages_b_txtmed" USING btree ("_parent_id");
  CREATE INDEX "pages_b_txtmed_path_idx" ON "pages_b_txtmed" USING btree ("_path");
  CREATE INDEX "pages_b_txtmed_media_idx" ON "pages_b_txtmed" USING btree ("media_id");
  CREATE INDEX "pages_b_cards_manual_cards_order_idx" ON "pages_b_cards_manual_cards" USING btree ("_order");
  CREATE INDEX "pages_b_cards_manual_cards_parent_id_idx" ON "pages_b_cards_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cards_manual_cards_image_idx" ON "pages_b_cards_manual_cards" USING btree ("image_id");
  CREATE INDEX "pages_b_cards_links_order_idx" ON "pages_b_cards_links" USING btree ("_order");
  CREATE INDEX "pages_b_cards_links_parent_id_idx" ON "pages_b_cards_links" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cards_order_idx" ON "pages_b_cards" USING btree ("_order");
  CREATE INDEX "pages_b_cards_parent_id_idx" ON "pages_b_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cards_path_idx" ON "pages_b_cards" USING btree ("_path");
  CREATE INDEX "pages_b_feats_features_order_idx" ON "pages_b_feats_features" USING btree ("_order");
  CREATE INDEX "pages_b_feats_features_parent_id_idx" ON "pages_b_feats_features" USING btree ("_parent_id");
  CREATE INDEX "pages_b_feats_links_order_idx" ON "pages_b_feats_links" USING btree ("_order");
  CREATE INDEX "pages_b_feats_links_parent_id_idx" ON "pages_b_feats_links" USING btree ("_parent_id");
  CREATE INDEX "pages_b_feats_order_idx" ON "pages_b_feats" USING btree ("_order");
  CREATE INDEX "pages_b_feats_parent_id_idx" ON "pages_b_feats" USING btree ("_parent_id");
  CREATE INDEX "pages_b_feats_path_idx" ON "pages_b_feats" USING btree ("_path");
  CREATE INDEX "pages_b_gal_images_order_idx" ON "pages_b_gal_images" USING btree ("_order");
  CREATE INDEX "pages_b_gal_images_parent_id_idx" ON "pages_b_gal_images" USING btree ("_parent_id");
  CREATE INDEX "pages_b_gal_images_image_idx" ON "pages_b_gal_images" USING btree ("image_id");
  CREATE INDEX "pages_b_gal_order_idx" ON "pages_b_gal" USING btree ("_order");
  CREATE INDEX "pages_b_gal_parent_id_idx" ON "pages_b_gal" USING btree ("_parent_id");
  CREATE INDEX "pages_b_gal_path_idx" ON "pages_b_gal" USING btree ("_path");
  CREATE INDEX "pages_b_tstm_order_idx" ON "pages_b_tstm" USING btree ("_order");
  CREATE INDEX "pages_b_tstm_parent_id_idx" ON "pages_b_tstm" USING btree ("_parent_id");
  CREATE INDEX "pages_b_tstm_path_idx" ON "pages_b_tstm" USING btree ("_path");
  CREATE INDEX "pages_b_tstm_service_idx" ON "pages_b_tstm" USING btree ("service_id");
  CREATE INDEX "pages_b_faq_items_order_idx" ON "pages_b_faq_items" USING btree ("_order");
  CREATE INDEX "pages_b_faq_items_parent_id_idx" ON "pages_b_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_b_faq_order_idx" ON "pages_b_faq" USING btree ("_order");
  CREATE INDEX "pages_b_faq_parent_id_idx" ON "pages_b_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_b_faq_path_idx" ON "pages_b_faq" USING btree ("_path");
  CREATE INDEX "pages_b_cta_links_order_idx" ON "pages_b_cta_links" USING btree ("_order");
  CREATE INDEX "pages_b_cta_links_parent_id_idx" ON "pages_b_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cta_order_idx" ON "pages_b_cta" USING btree ("_order");
  CREATE INDEX "pages_b_cta_parent_id_idx" ON "pages_b_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cta_path_idx" ON "pages_b_cta" USING btree ("_path");
  CREATE INDEX "pages_b_cta_background_image_idx" ON "pages_b_cta" USING btree ("background_image_id");
  CREATE INDEX "pages_b_form_order_idx" ON "pages_b_form" USING btree ("_order");
  CREATE INDEX "pages_b_form_parent_id_idx" ON "pages_b_form" USING btree ("_parent_id");
  CREATE INDEX "pages_b_form_path_idx" ON "pages_b_form" USING btree ("_path");
  CREATE INDEX "pages_b_form_form_idx" ON "pages_b_form" USING btree ("form_id");
  CREATE INDEX "pages_b_gated_bullets_order_idx" ON "pages_b_gated_bullets" USING btree ("_order");
  CREATE INDEX "pages_b_gated_bullets_parent_id_idx" ON "pages_b_gated_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_b_gated_order_idx" ON "pages_b_gated" USING btree ("_order");
  CREATE INDEX "pages_b_gated_parent_id_idx" ON "pages_b_gated" USING btree ("_parent_id");
  CREATE INDEX "pages_b_gated_path_idx" ON "pages_b_gated" USING btree ("_path");
  CREATE INDEX "pages_b_gated_download_idx" ON "pages_b_gated" USING btree ("download_id");
  CREATE INDEX "pages_b_gated_cover_image_idx" ON "pages_b_gated" USING btree ("cover_image_id");
  CREATE INDEX "pages_b_dls_order_idx" ON "pages_b_dls" USING btree ("_order");
  CREATE INDEX "pages_b_dls_parent_id_idx" ON "pages_b_dls" USING btree ("_parent_id");
  CREATE INDEX "pages_b_dls_path_idx" ON "pages_b_dls" USING btree ("_path");
  CREATE INDEX "pages_b_dls_category_idx" ON "pages_b_dls" USING btree ("category_id");
  CREATE INDEX "pages_b_cont_columns_order_idx" ON "pages_b_cont_columns" USING btree ("_order");
  CREATE INDEX "pages_b_cont_columns_parent_id_idx" ON "pages_b_cont_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cont_order_idx" ON "pages_b_cont" USING btree ("_order");
  CREATE INDEX "pages_b_cont_parent_id_idx" ON "pages_b_cont" USING btree ("_parent_id");
  CREATE INDEX "pages_b_cont_path_idx" ON "pages_b_cont" USING btree ("_path");
  CREATE INDEX "pages_b_med_order_idx" ON "pages_b_med" USING btree ("_order");
  CREATE INDEX "pages_b_med_parent_id_idx" ON "pages_b_med" USING btree ("_parent_id");
  CREATE INDEX "pages_b_med_path_idx" ON "pages_b_med" USING btree ("_path");
  CREATE INDEX "pages_b_med_media_idx" ON "pages_b_med" USING btree ("media_id");
  CREATE INDEX "pages_b_arch_order_idx" ON "pages_b_arch" USING btree ("_order");
  CREATE INDEX "pages_b_arch_parent_id_idx" ON "pages_b_arch" USING btree ("_parent_id");
  CREATE INDEX "pages_b_arch_path_idx" ON "pages_b_arch" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_case_studies_id_idx" ON "pages_rels" USING btree ("case_studies_id");
  CREATE INDEX "pages_rels_locations_id_idx" ON "pages_rels" USING btree ("locations_id");
  CREATE INDEX "pages_rels_team_id_idx" ON "pages_rels" USING btree ("team_id");
  CREATE INDEX "pages_rels_downloads_id_idx" ON "pages_rels" USING btree ("downloads_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX "__pages_v_b_hero_v_links_order_idx" ON "__pages_v_b_hero_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_b_hero_v_links_parent_id_idx" ON "__pages_v_b_hero_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_hero_v_trust_signals_order_idx" ON "__pages_v_b_hero_v_trust_signals" USING btree ("_order");
  CREATE INDEX "__pages_v_b_hero_v_trust_signals_parent_id_idx" ON "__pages_v_b_hero_v_trust_signals" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_hero_v_order_idx" ON "__pages_v_b_hero_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_hero_v_parent_id_idx" ON "__pages_v_b_hero_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_hero_v_path_idx" ON "__pages_v_b_hero_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_hero_v_image_idx" ON "__pages_v_b_hero_v" USING btree ("image_id");
  CREATE INDEX "__pages_v_b_hero_v_video_idx" ON "__pages_v_b_hero_v" USING btree ("video_id");
  CREATE INDEX "__pages_v_b_hero_v_video_poster_idx" ON "__pages_v_b_hero_v" USING btree ("video_poster_id");
  CREATE INDEX "__pages_v_b_txtmed_v_bullets_order_idx" ON "__pages_v_b_txtmed_v_bullets" USING btree ("_order");
  CREATE INDEX "__pages_v_b_txtmed_v_bullets_parent_id_idx" ON "__pages_v_b_txtmed_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_txtmed_v_links_order_idx" ON "__pages_v_b_txtmed_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_b_txtmed_v_links_parent_id_idx" ON "__pages_v_b_txtmed_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_txtmed_v_order_idx" ON "__pages_v_b_txtmed_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_txtmed_v_parent_id_idx" ON "__pages_v_b_txtmed_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_txtmed_v_path_idx" ON "__pages_v_b_txtmed_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_txtmed_v_media_idx" ON "__pages_v_b_txtmed_v" USING btree ("media_id");
  CREATE INDEX "__pages_v_b_cards_v_manual_cards_order_idx" ON "__pages_v_b_cards_v_manual_cards" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cards_v_manual_cards_parent_id_idx" ON "__pages_v_b_cards_v_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cards_v_manual_cards_image_idx" ON "__pages_v_b_cards_v_manual_cards" USING btree ("image_id");
  CREATE INDEX "__pages_v_b_cards_v_links_order_idx" ON "__pages_v_b_cards_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cards_v_links_parent_id_idx" ON "__pages_v_b_cards_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cards_v_order_idx" ON "__pages_v_b_cards_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cards_v_parent_id_idx" ON "__pages_v_b_cards_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cards_v_path_idx" ON "__pages_v_b_cards_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_feats_v_features_order_idx" ON "__pages_v_b_feats_v_features" USING btree ("_order");
  CREATE INDEX "__pages_v_b_feats_v_features_parent_id_idx" ON "__pages_v_b_feats_v_features" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_feats_v_links_order_idx" ON "__pages_v_b_feats_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_b_feats_v_links_parent_id_idx" ON "__pages_v_b_feats_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_feats_v_order_idx" ON "__pages_v_b_feats_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_feats_v_parent_id_idx" ON "__pages_v_b_feats_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_feats_v_path_idx" ON "__pages_v_b_feats_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_gal_v_images_order_idx" ON "__pages_v_b_gal_v_images" USING btree ("_order");
  CREATE INDEX "__pages_v_b_gal_v_images_parent_id_idx" ON "__pages_v_b_gal_v_images" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_gal_v_images_image_idx" ON "__pages_v_b_gal_v_images" USING btree ("image_id");
  CREATE INDEX "__pages_v_b_gal_v_order_idx" ON "__pages_v_b_gal_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_gal_v_parent_id_idx" ON "__pages_v_b_gal_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_gal_v_path_idx" ON "__pages_v_b_gal_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_tstm_v_order_idx" ON "__pages_v_b_tstm_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_tstm_v_parent_id_idx" ON "__pages_v_b_tstm_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_tstm_v_path_idx" ON "__pages_v_b_tstm_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_tstm_v_service_idx" ON "__pages_v_b_tstm_v" USING btree ("service_id");
  CREATE INDEX "__pages_v_b_faq_v_items_order_idx" ON "__pages_v_b_faq_v_items" USING btree ("_order");
  CREATE INDEX "__pages_v_b_faq_v_items_parent_id_idx" ON "__pages_v_b_faq_v_items" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_faq_v_order_idx" ON "__pages_v_b_faq_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_faq_v_parent_id_idx" ON "__pages_v_b_faq_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_faq_v_path_idx" ON "__pages_v_b_faq_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_cta_v_links_order_idx" ON "__pages_v_b_cta_v_links" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cta_v_links_parent_id_idx" ON "__pages_v_b_cta_v_links" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cta_v_order_idx" ON "__pages_v_b_cta_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cta_v_parent_id_idx" ON "__pages_v_b_cta_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cta_v_path_idx" ON "__pages_v_b_cta_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_cta_v_background_image_idx" ON "__pages_v_b_cta_v" USING btree ("background_image_id");
  CREATE INDEX "__pages_v_b_form_v_order_idx" ON "__pages_v_b_form_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_form_v_parent_id_idx" ON "__pages_v_b_form_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_form_v_path_idx" ON "__pages_v_b_form_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_form_v_form_idx" ON "__pages_v_b_form_v" USING btree ("form_id");
  CREATE INDEX "__pages_v_b_gated_v_bullets_order_idx" ON "__pages_v_b_gated_v_bullets" USING btree ("_order");
  CREATE INDEX "__pages_v_b_gated_v_bullets_parent_id_idx" ON "__pages_v_b_gated_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_gated_v_order_idx" ON "__pages_v_b_gated_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_gated_v_parent_id_idx" ON "__pages_v_b_gated_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_gated_v_path_idx" ON "__pages_v_b_gated_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_gated_v_download_idx" ON "__pages_v_b_gated_v" USING btree ("download_id");
  CREATE INDEX "__pages_v_b_gated_v_cover_image_idx" ON "__pages_v_b_gated_v" USING btree ("cover_image_id");
  CREATE INDEX "__pages_v_b_dls_v_order_idx" ON "__pages_v_b_dls_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_dls_v_parent_id_idx" ON "__pages_v_b_dls_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_dls_v_path_idx" ON "__pages_v_b_dls_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_dls_v_category_idx" ON "__pages_v_b_dls_v" USING btree ("category_id");
  CREATE INDEX "__pages_v_b_cont_v_columns_order_idx" ON "__pages_v_b_cont_v_columns" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cont_v_columns_parent_id_idx" ON "__pages_v_b_cont_v_columns" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cont_v_order_idx" ON "__pages_v_b_cont_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_cont_v_parent_id_idx" ON "__pages_v_b_cont_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_cont_v_path_idx" ON "__pages_v_b_cont_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_med_v_order_idx" ON "__pages_v_b_med_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_med_v_parent_id_idx" ON "__pages_v_b_med_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_med_v_path_idx" ON "__pages_v_b_med_v" USING btree ("_path");
  CREATE INDEX "__pages_v_b_med_v_media_idx" ON "__pages_v_b_med_v" USING btree ("media_id");
  CREATE INDEX "__pages_v_b_arch_v_order_idx" ON "__pages_v_b_arch_v" USING btree ("_order");
  CREATE INDEX "__pages_v_b_arch_v_parent_id_idx" ON "__pages_v_b_arch_v" USING btree ("_parent_id");
  CREATE INDEX "__pages_v_b_arch_v_path_idx" ON "__pages_v_b_arch_v" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_case_studies_id_idx" ON "_pages_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_pages_v_rels_locations_id_idx" ON "_pages_v_rels" USING btree ("locations_id");
  CREATE INDEX "_pages_v_rels_team_id_idx" ON "_pages_v_rels" USING btree ("team_id");
  CREATE INDEX "_pages_v_rels_downloads_id_idx" ON "_pages_v_rels" USING btree ("downloads_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_testimonials_id_idx" ON "_pages_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "posts_b_txtmed_bullets_order_idx" ON "posts_b_txtmed_bullets" USING btree ("_order");
  CREATE INDEX "posts_b_txtmed_bullets_parent_id_idx" ON "posts_b_txtmed_bullets" USING btree ("_parent_id");
  CREATE INDEX "posts_b_txtmed_links_order_idx" ON "posts_b_txtmed_links" USING btree ("_order");
  CREATE INDEX "posts_b_txtmed_links_parent_id_idx" ON "posts_b_txtmed_links" USING btree ("_parent_id");
  CREATE INDEX "posts_b_txtmed_order_idx" ON "posts_b_txtmed" USING btree ("_order");
  CREATE INDEX "posts_b_txtmed_parent_id_idx" ON "posts_b_txtmed" USING btree ("_parent_id");
  CREATE INDEX "posts_b_txtmed_path_idx" ON "posts_b_txtmed" USING btree ("_path");
  CREATE INDEX "posts_b_txtmed_media_idx" ON "posts_b_txtmed" USING btree ("media_id");
  CREATE INDEX "posts_b_cards_manual_cards_order_idx" ON "posts_b_cards_manual_cards" USING btree ("_order");
  CREATE INDEX "posts_b_cards_manual_cards_parent_id_idx" ON "posts_b_cards_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cards_manual_cards_image_idx" ON "posts_b_cards_manual_cards" USING btree ("image_id");
  CREATE INDEX "posts_b_cards_links_order_idx" ON "posts_b_cards_links" USING btree ("_order");
  CREATE INDEX "posts_b_cards_links_parent_id_idx" ON "posts_b_cards_links" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cards_order_idx" ON "posts_b_cards" USING btree ("_order");
  CREATE INDEX "posts_b_cards_parent_id_idx" ON "posts_b_cards" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cards_path_idx" ON "posts_b_cards" USING btree ("_path");
  CREATE INDEX "posts_b_feats_features_order_idx" ON "posts_b_feats_features" USING btree ("_order");
  CREATE INDEX "posts_b_feats_features_parent_id_idx" ON "posts_b_feats_features" USING btree ("_parent_id");
  CREATE INDEX "posts_b_feats_links_order_idx" ON "posts_b_feats_links" USING btree ("_order");
  CREATE INDEX "posts_b_feats_links_parent_id_idx" ON "posts_b_feats_links" USING btree ("_parent_id");
  CREATE INDEX "posts_b_feats_order_idx" ON "posts_b_feats" USING btree ("_order");
  CREATE INDEX "posts_b_feats_parent_id_idx" ON "posts_b_feats" USING btree ("_parent_id");
  CREATE INDEX "posts_b_feats_path_idx" ON "posts_b_feats" USING btree ("_path");
  CREATE INDEX "posts_b_gal_images_order_idx" ON "posts_b_gal_images" USING btree ("_order");
  CREATE INDEX "posts_b_gal_images_parent_id_idx" ON "posts_b_gal_images" USING btree ("_parent_id");
  CREATE INDEX "posts_b_gal_images_image_idx" ON "posts_b_gal_images" USING btree ("image_id");
  CREATE INDEX "posts_b_gal_order_idx" ON "posts_b_gal" USING btree ("_order");
  CREATE INDEX "posts_b_gal_parent_id_idx" ON "posts_b_gal" USING btree ("_parent_id");
  CREATE INDEX "posts_b_gal_path_idx" ON "posts_b_gal" USING btree ("_path");
  CREATE INDEX "posts_b_tstm_order_idx" ON "posts_b_tstm" USING btree ("_order");
  CREATE INDEX "posts_b_tstm_parent_id_idx" ON "posts_b_tstm" USING btree ("_parent_id");
  CREATE INDEX "posts_b_tstm_path_idx" ON "posts_b_tstm" USING btree ("_path");
  CREATE INDEX "posts_b_tstm_service_idx" ON "posts_b_tstm" USING btree ("service_id");
  CREATE INDEX "posts_b_faq_items_order_idx" ON "posts_b_faq_items" USING btree ("_order");
  CREATE INDEX "posts_b_faq_items_parent_id_idx" ON "posts_b_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_b_faq_order_idx" ON "posts_b_faq" USING btree ("_order");
  CREATE INDEX "posts_b_faq_parent_id_idx" ON "posts_b_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_b_faq_path_idx" ON "posts_b_faq" USING btree ("_path");
  CREATE INDEX "posts_b_cta_links_order_idx" ON "posts_b_cta_links" USING btree ("_order");
  CREATE INDEX "posts_b_cta_links_parent_id_idx" ON "posts_b_cta_links" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cta_order_idx" ON "posts_b_cta" USING btree ("_order");
  CREATE INDEX "posts_b_cta_parent_id_idx" ON "posts_b_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cta_path_idx" ON "posts_b_cta" USING btree ("_path");
  CREATE INDEX "posts_b_cta_background_image_idx" ON "posts_b_cta" USING btree ("background_image_id");
  CREATE INDEX "posts_b_form_order_idx" ON "posts_b_form" USING btree ("_order");
  CREATE INDEX "posts_b_form_parent_id_idx" ON "posts_b_form" USING btree ("_parent_id");
  CREATE INDEX "posts_b_form_path_idx" ON "posts_b_form" USING btree ("_path");
  CREATE INDEX "posts_b_form_form_idx" ON "posts_b_form" USING btree ("form_id");
  CREATE INDEX "posts_b_gated_bullets_order_idx" ON "posts_b_gated_bullets" USING btree ("_order");
  CREATE INDEX "posts_b_gated_bullets_parent_id_idx" ON "posts_b_gated_bullets" USING btree ("_parent_id");
  CREATE INDEX "posts_b_gated_order_idx" ON "posts_b_gated" USING btree ("_order");
  CREATE INDEX "posts_b_gated_parent_id_idx" ON "posts_b_gated" USING btree ("_parent_id");
  CREATE INDEX "posts_b_gated_path_idx" ON "posts_b_gated" USING btree ("_path");
  CREATE INDEX "posts_b_gated_download_idx" ON "posts_b_gated" USING btree ("download_id");
  CREATE INDEX "posts_b_gated_cover_image_idx" ON "posts_b_gated" USING btree ("cover_image_id");
  CREATE INDEX "posts_b_dls_order_idx" ON "posts_b_dls" USING btree ("_order");
  CREATE INDEX "posts_b_dls_parent_id_idx" ON "posts_b_dls" USING btree ("_parent_id");
  CREATE INDEX "posts_b_dls_path_idx" ON "posts_b_dls" USING btree ("_path");
  CREATE INDEX "posts_b_dls_category_idx" ON "posts_b_dls" USING btree ("category_id");
  CREATE INDEX "posts_b_cont_columns_order_idx" ON "posts_b_cont_columns" USING btree ("_order");
  CREATE INDEX "posts_b_cont_columns_parent_id_idx" ON "posts_b_cont_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cont_order_idx" ON "posts_b_cont" USING btree ("_order");
  CREATE INDEX "posts_b_cont_parent_id_idx" ON "posts_b_cont" USING btree ("_parent_id");
  CREATE INDEX "posts_b_cont_path_idx" ON "posts_b_cont" USING btree ("_path");
  CREATE INDEX "posts_b_med_order_idx" ON "posts_b_med" USING btree ("_order");
  CREATE INDEX "posts_b_med_parent_id_idx" ON "posts_b_med" USING btree ("_parent_id");
  CREATE INDEX "posts_b_med_path_idx" ON "posts_b_med" USING btree ("_path");
  CREATE INDEX "posts_b_med_media_idx" ON "posts_b_med" USING btree ("media_id");
  CREATE INDEX "posts_b_arch_order_idx" ON "posts_b_arch" USING btree ("_order");
  CREATE INDEX "posts_b_arch_parent_id_idx" ON "posts_b_arch" USING btree ("_parent_id");
  CREATE INDEX "posts_b_arch_path_idx" ON "posts_b_arch" USING btree ("_path");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_reviewed_by_idx" ON "posts" USING btree ("reviewed_by_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_services_id_idx" ON "posts_rels" USING btree ("services_id");
  CREATE INDEX "posts_rels_case_studies_id_idx" ON "posts_rels" USING btree ("case_studies_id");
  CREATE INDEX "posts_rels_locations_id_idx" ON "posts_rels" USING btree ("locations_id");
  CREATE INDEX "posts_rels_team_id_idx" ON "posts_rels" USING btree ("team_id");
  CREATE INDEX "posts_rels_downloads_id_idx" ON "posts_rels" USING btree ("downloads_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_testimonials_id_idx" ON "posts_rels" USING btree ("testimonials_id");
  CREATE INDEX "__posts_v_b_txtmed_v_bullets_order_idx" ON "__posts_v_b_txtmed_v_bullets" USING btree ("_order");
  CREATE INDEX "__posts_v_b_txtmed_v_bullets_parent_id_idx" ON "__posts_v_b_txtmed_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_txtmed_v_links_order_idx" ON "__posts_v_b_txtmed_v_links" USING btree ("_order");
  CREATE INDEX "__posts_v_b_txtmed_v_links_parent_id_idx" ON "__posts_v_b_txtmed_v_links" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_txtmed_v_order_idx" ON "__posts_v_b_txtmed_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_txtmed_v_parent_id_idx" ON "__posts_v_b_txtmed_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_txtmed_v_path_idx" ON "__posts_v_b_txtmed_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_txtmed_v_media_idx" ON "__posts_v_b_txtmed_v" USING btree ("media_id");
  CREATE INDEX "__posts_v_b_cards_v_manual_cards_order_idx" ON "__posts_v_b_cards_v_manual_cards" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cards_v_manual_cards_parent_id_idx" ON "__posts_v_b_cards_v_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cards_v_manual_cards_image_idx" ON "__posts_v_b_cards_v_manual_cards" USING btree ("image_id");
  CREATE INDEX "__posts_v_b_cards_v_links_order_idx" ON "__posts_v_b_cards_v_links" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cards_v_links_parent_id_idx" ON "__posts_v_b_cards_v_links" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cards_v_order_idx" ON "__posts_v_b_cards_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cards_v_parent_id_idx" ON "__posts_v_b_cards_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cards_v_path_idx" ON "__posts_v_b_cards_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_feats_v_features_order_idx" ON "__posts_v_b_feats_v_features" USING btree ("_order");
  CREATE INDEX "__posts_v_b_feats_v_features_parent_id_idx" ON "__posts_v_b_feats_v_features" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_feats_v_links_order_idx" ON "__posts_v_b_feats_v_links" USING btree ("_order");
  CREATE INDEX "__posts_v_b_feats_v_links_parent_id_idx" ON "__posts_v_b_feats_v_links" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_feats_v_order_idx" ON "__posts_v_b_feats_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_feats_v_parent_id_idx" ON "__posts_v_b_feats_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_feats_v_path_idx" ON "__posts_v_b_feats_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_gal_v_images_order_idx" ON "__posts_v_b_gal_v_images" USING btree ("_order");
  CREATE INDEX "__posts_v_b_gal_v_images_parent_id_idx" ON "__posts_v_b_gal_v_images" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_gal_v_images_image_idx" ON "__posts_v_b_gal_v_images" USING btree ("image_id");
  CREATE INDEX "__posts_v_b_gal_v_order_idx" ON "__posts_v_b_gal_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_gal_v_parent_id_idx" ON "__posts_v_b_gal_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_gal_v_path_idx" ON "__posts_v_b_gal_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_tstm_v_order_idx" ON "__posts_v_b_tstm_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_tstm_v_parent_id_idx" ON "__posts_v_b_tstm_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_tstm_v_path_idx" ON "__posts_v_b_tstm_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_tstm_v_service_idx" ON "__posts_v_b_tstm_v" USING btree ("service_id");
  CREATE INDEX "__posts_v_b_faq_v_items_order_idx" ON "__posts_v_b_faq_v_items" USING btree ("_order");
  CREATE INDEX "__posts_v_b_faq_v_items_parent_id_idx" ON "__posts_v_b_faq_v_items" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_faq_v_order_idx" ON "__posts_v_b_faq_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_faq_v_parent_id_idx" ON "__posts_v_b_faq_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_faq_v_path_idx" ON "__posts_v_b_faq_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_cta_v_links_order_idx" ON "__posts_v_b_cta_v_links" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cta_v_links_parent_id_idx" ON "__posts_v_b_cta_v_links" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cta_v_order_idx" ON "__posts_v_b_cta_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cta_v_parent_id_idx" ON "__posts_v_b_cta_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cta_v_path_idx" ON "__posts_v_b_cta_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_cta_v_background_image_idx" ON "__posts_v_b_cta_v" USING btree ("background_image_id");
  CREATE INDEX "__posts_v_b_form_v_order_idx" ON "__posts_v_b_form_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_form_v_parent_id_idx" ON "__posts_v_b_form_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_form_v_path_idx" ON "__posts_v_b_form_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_form_v_form_idx" ON "__posts_v_b_form_v" USING btree ("form_id");
  CREATE INDEX "__posts_v_b_gated_v_bullets_order_idx" ON "__posts_v_b_gated_v_bullets" USING btree ("_order");
  CREATE INDEX "__posts_v_b_gated_v_bullets_parent_id_idx" ON "__posts_v_b_gated_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_gated_v_order_idx" ON "__posts_v_b_gated_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_gated_v_parent_id_idx" ON "__posts_v_b_gated_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_gated_v_path_idx" ON "__posts_v_b_gated_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_gated_v_download_idx" ON "__posts_v_b_gated_v" USING btree ("download_id");
  CREATE INDEX "__posts_v_b_gated_v_cover_image_idx" ON "__posts_v_b_gated_v" USING btree ("cover_image_id");
  CREATE INDEX "__posts_v_b_dls_v_order_idx" ON "__posts_v_b_dls_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_dls_v_parent_id_idx" ON "__posts_v_b_dls_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_dls_v_path_idx" ON "__posts_v_b_dls_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_dls_v_category_idx" ON "__posts_v_b_dls_v" USING btree ("category_id");
  CREATE INDEX "__posts_v_b_cont_v_columns_order_idx" ON "__posts_v_b_cont_v_columns" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cont_v_columns_parent_id_idx" ON "__posts_v_b_cont_v_columns" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cont_v_order_idx" ON "__posts_v_b_cont_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_cont_v_parent_id_idx" ON "__posts_v_b_cont_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_cont_v_path_idx" ON "__posts_v_b_cont_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_med_v_order_idx" ON "__posts_v_b_med_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_med_v_parent_id_idx" ON "__posts_v_b_med_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_med_v_path_idx" ON "__posts_v_b_med_v" USING btree ("_path");
  CREATE INDEX "__posts_v_b_med_v_media_idx" ON "__posts_v_b_med_v" USING btree ("media_id");
  CREATE INDEX "__posts_v_b_arch_v_order_idx" ON "__posts_v_b_arch_v" USING btree ("_order");
  CREATE INDEX "__posts_v_b_arch_v_parent_id_idx" ON "__posts_v_b_arch_v" USING btree ("_parent_id");
  CREATE INDEX "__posts_v_b_arch_v_path_idx" ON "__posts_v_b_arch_v" USING btree ("_path");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_reviewed_by_idx" ON "_posts_v" USING btree ("version_reviewed_by_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_services_id_idx" ON "_posts_v_rels" USING btree ("services_id");
  CREATE INDEX "_posts_v_rels_case_studies_id_idx" ON "_posts_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_posts_v_rels_locations_id_idx" ON "_posts_v_rels" USING btree ("locations_id");
  CREATE INDEX "_posts_v_rels_team_id_idx" ON "_posts_v_rels" USING btree ("team_id");
  CREATE INDEX "_posts_v_rels_downloads_id_idx" ON "_posts_v_rels" USING btree ("downloads_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_testimonials_id_idx" ON "_posts_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "services_b_txtmed_bullets_order_idx" ON "services_b_txtmed_bullets" USING btree ("_order");
  CREATE INDEX "services_b_txtmed_bullets_parent_id_idx" ON "services_b_txtmed_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_b_txtmed_links_order_idx" ON "services_b_txtmed_links" USING btree ("_order");
  CREATE INDEX "services_b_txtmed_links_parent_id_idx" ON "services_b_txtmed_links" USING btree ("_parent_id");
  CREATE INDEX "services_b_txtmed_order_idx" ON "services_b_txtmed" USING btree ("_order");
  CREATE INDEX "services_b_txtmed_parent_id_idx" ON "services_b_txtmed" USING btree ("_parent_id");
  CREATE INDEX "services_b_txtmed_path_idx" ON "services_b_txtmed" USING btree ("_path");
  CREATE INDEX "services_b_txtmed_media_idx" ON "services_b_txtmed" USING btree ("media_id");
  CREATE INDEX "services_b_cards_manual_cards_order_idx" ON "services_b_cards_manual_cards" USING btree ("_order");
  CREATE INDEX "services_b_cards_manual_cards_parent_id_idx" ON "services_b_cards_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "services_b_cards_manual_cards_image_idx" ON "services_b_cards_manual_cards" USING btree ("image_id");
  CREATE INDEX "services_b_cards_links_order_idx" ON "services_b_cards_links" USING btree ("_order");
  CREATE INDEX "services_b_cards_links_parent_id_idx" ON "services_b_cards_links" USING btree ("_parent_id");
  CREATE INDEX "services_b_cards_order_idx" ON "services_b_cards" USING btree ("_order");
  CREATE INDEX "services_b_cards_parent_id_idx" ON "services_b_cards" USING btree ("_parent_id");
  CREATE INDEX "services_b_cards_path_idx" ON "services_b_cards" USING btree ("_path");
  CREATE INDEX "services_b_feats_features_order_idx" ON "services_b_feats_features" USING btree ("_order");
  CREATE INDEX "services_b_feats_features_parent_id_idx" ON "services_b_feats_features" USING btree ("_parent_id");
  CREATE INDEX "services_b_feats_links_order_idx" ON "services_b_feats_links" USING btree ("_order");
  CREATE INDEX "services_b_feats_links_parent_id_idx" ON "services_b_feats_links" USING btree ("_parent_id");
  CREATE INDEX "services_b_feats_order_idx" ON "services_b_feats" USING btree ("_order");
  CREATE INDEX "services_b_feats_parent_id_idx" ON "services_b_feats" USING btree ("_parent_id");
  CREATE INDEX "services_b_feats_path_idx" ON "services_b_feats" USING btree ("_path");
  CREATE INDEX "services_b_gal_images_order_idx" ON "services_b_gal_images" USING btree ("_order");
  CREATE INDEX "services_b_gal_images_parent_id_idx" ON "services_b_gal_images" USING btree ("_parent_id");
  CREATE INDEX "services_b_gal_images_image_idx" ON "services_b_gal_images" USING btree ("image_id");
  CREATE INDEX "services_b_gal_order_idx" ON "services_b_gal" USING btree ("_order");
  CREATE INDEX "services_b_gal_parent_id_idx" ON "services_b_gal" USING btree ("_parent_id");
  CREATE INDEX "services_b_gal_path_idx" ON "services_b_gal" USING btree ("_path");
  CREATE INDEX "services_b_tstm_order_idx" ON "services_b_tstm" USING btree ("_order");
  CREATE INDEX "services_b_tstm_parent_id_idx" ON "services_b_tstm" USING btree ("_parent_id");
  CREATE INDEX "services_b_tstm_path_idx" ON "services_b_tstm" USING btree ("_path");
  CREATE INDEX "services_b_tstm_service_idx" ON "services_b_tstm" USING btree ("service_id");
  CREATE INDEX "services_b_faq_items_order_idx" ON "services_b_faq_items" USING btree ("_order");
  CREATE INDEX "services_b_faq_items_parent_id_idx" ON "services_b_faq_items" USING btree ("_parent_id");
  CREATE INDEX "services_b_faq_order_idx" ON "services_b_faq" USING btree ("_order");
  CREATE INDEX "services_b_faq_parent_id_idx" ON "services_b_faq" USING btree ("_parent_id");
  CREATE INDEX "services_b_faq_path_idx" ON "services_b_faq" USING btree ("_path");
  CREATE INDEX "services_b_cta_links_order_idx" ON "services_b_cta_links" USING btree ("_order");
  CREATE INDEX "services_b_cta_links_parent_id_idx" ON "services_b_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_b_cta_order_idx" ON "services_b_cta" USING btree ("_order");
  CREATE INDEX "services_b_cta_parent_id_idx" ON "services_b_cta" USING btree ("_parent_id");
  CREATE INDEX "services_b_cta_path_idx" ON "services_b_cta" USING btree ("_path");
  CREATE INDEX "services_b_cta_background_image_idx" ON "services_b_cta" USING btree ("background_image_id");
  CREATE INDEX "services_b_form_order_idx" ON "services_b_form" USING btree ("_order");
  CREATE INDEX "services_b_form_parent_id_idx" ON "services_b_form" USING btree ("_parent_id");
  CREATE INDEX "services_b_form_path_idx" ON "services_b_form" USING btree ("_path");
  CREATE INDEX "services_b_form_form_idx" ON "services_b_form" USING btree ("form_id");
  CREATE INDEX "services_b_gated_bullets_order_idx" ON "services_b_gated_bullets" USING btree ("_order");
  CREATE INDEX "services_b_gated_bullets_parent_id_idx" ON "services_b_gated_bullets" USING btree ("_parent_id");
  CREATE INDEX "services_b_gated_order_idx" ON "services_b_gated" USING btree ("_order");
  CREATE INDEX "services_b_gated_parent_id_idx" ON "services_b_gated" USING btree ("_parent_id");
  CREATE INDEX "services_b_gated_path_idx" ON "services_b_gated" USING btree ("_path");
  CREATE INDEX "services_b_gated_download_idx" ON "services_b_gated" USING btree ("download_id");
  CREATE INDEX "services_b_gated_cover_image_idx" ON "services_b_gated" USING btree ("cover_image_id");
  CREATE INDEX "services_b_dls_order_idx" ON "services_b_dls" USING btree ("_order");
  CREATE INDEX "services_b_dls_parent_id_idx" ON "services_b_dls" USING btree ("_parent_id");
  CREATE INDEX "services_b_dls_path_idx" ON "services_b_dls" USING btree ("_path");
  CREATE INDEX "services_b_dls_category_idx" ON "services_b_dls" USING btree ("category_id");
  CREATE INDEX "services_b_cont_columns_order_idx" ON "services_b_cont_columns" USING btree ("_order");
  CREATE INDEX "services_b_cont_columns_parent_id_idx" ON "services_b_cont_columns" USING btree ("_parent_id");
  CREATE INDEX "services_b_cont_order_idx" ON "services_b_cont" USING btree ("_order");
  CREATE INDEX "services_b_cont_parent_id_idx" ON "services_b_cont" USING btree ("_parent_id");
  CREATE INDEX "services_b_cont_path_idx" ON "services_b_cont" USING btree ("_path");
  CREATE INDEX "services_b_med_order_idx" ON "services_b_med" USING btree ("_order");
  CREATE INDEX "services_b_med_parent_id_idx" ON "services_b_med" USING btree ("_parent_id");
  CREATE INDEX "services_b_med_path_idx" ON "services_b_med" USING btree ("_path");
  CREATE INDEX "services_b_med_media_idx" ON "services_b_med" USING btree ("media_id");
  CREATE INDEX "services_b_arch_order_idx" ON "services_b_arch" USING btree ("_order");
  CREATE INDEX "services_b_arch_parent_id_idx" ON "services_b_arch" USING btree ("_parent_id");
  CREATE INDEX "services_b_arch_path_idx" ON "services_b_arch" USING btree ("_path");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_featured_image_idx" ON "services" USING btree ("featured_image_id");
  CREATE INDEX "services_parent_idx" ON "services" USING btree ("parent_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_case_studies_id_idx" ON "services_rels" USING btree ("case_studies_id");
  CREATE INDEX "services_rels_locations_id_idx" ON "services_rels" USING btree ("locations_id");
  CREATE INDEX "services_rels_team_id_idx" ON "services_rels" USING btree ("team_id");
  CREATE INDEX "services_rels_downloads_id_idx" ON "services_rels" USING btree ("downloads_id");
  CREATE INDEX "services_rels_categories_id_idx" ON "services_rels" USING btree ("categories_id");
  CREATE INDEX "services_rels_testimonials_id_idx" ON "services_rels" USING btree ("testimonials_id");
  CREATE INDEX "__services_v_b_txtmed_v_bullets_order_idx" ON "__services_v_b_txtmed_v_bullets" USING btree ("_order");
  CREATE INDEX "__services_v_b_txtmed_v_bullets_parent_id_idx" ON "__services_v_b_txtmed_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_txtmed_v_links_order_idx" ON "__services_v_b_txtmed_v_links" USING btree ("_order");
  CREATE INDEX "__services_v_b_txtmed_v_links_parent_id_idx" ON "__services_v_b_txtmed_v_links" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_txtmed_v_order_idx" ON "__services_v_b_txtmed_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_txtmed_v_parent_id_idx" ON "__services_v_b_txtmed_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_txtmed_v_path_idx" ON "__services_v_b_txtmed_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_txtmed_v_media_idx" ON "__services_v_b_txtmed_v" USING btree ("media_id");
  CREATE INDEX "__services_v_b_cards_v_manual_cards_order_idx" ON "__services_v_b_cards_v_manual_cards" USING btree ("_order");
  CREATE INDEX "__services_v_b_cards_v_manual_cards_parent_id_idx" ON "__services_v_b_cards_v_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cards_v_manual_cards_image_idx" ON "__services_v_b_cards_v_manual_cards" USING btree ("image_id");
  CREATE INDEX "__services_v_b_cards_v_links_order_idx" ON "__services_v_b_cards_v_links" USING btree ("_order");
  CREATE INDEX "__services_v_b_cards_v_links_parent_id_idx" ON "__services_v_b_cards_v_links" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cards_v_order_idx" ON "__services_v_b_cards_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_cards_v_parent_id_idx" ON "__services_v_b_cards_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cards_v_path_idx" ON "__services_v_b_cards_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_feats_v_features_order_idx" ON "__services_v_b_feats_v_features" USING btree ("_order");
  CREATE INDEX "__services_v_b_feats_v_features_parent_id_idx" ON "__services_v_b_feats_v_features" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_feats_v_links_order_idx" ON "__services_v_b_feats_v_links" USING btree ("_order");
  CREATE INDEX "__services_v_b_feats_v_links_parent_id_idx" ON "__services_v_b_feats_v_links" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_feats_v_order_idx" ON "__services_v_b_feats_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_feats_v_parent_id_idx" ON "__services_v_b_feats_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_feats_v_path_idx" ON "__services_v_b_feats_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_gal_v_images_order_idx" ON "__services_v_b_gal_v_images" USING btree ("_order");
  CREATE INDEX "__services_v_b_gal_v_images_parent_id_idx" ON "__services_v_b_gal_v_images" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_gal_v_images_image_idx" ON "__services_v_b_gal_v_images" USING btree ("image_id");
  CREATE INDEX "__services_v_b_gal_v_order_idx" ON "__services_v_b_gal_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_gal_v_parent_id_idx" ON "__services_v_b_gal_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_gal_v_path_idx" ON "__services_v_b_gal_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_tstm_v_order_idx" ON "__services_v_b_tstm_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_tstm_v_parent_id_idx" ON "__services_v_b_tstm_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_tstm_v_path_idx" ON "__services_v_b_tstm_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_tstm_v_service_idx" ON "__services_v_b_tstm_v" USING btree ("service_id");
  CREATE INDEX "__services_v_b_faq_v_items_order_idx" ON "__services_v_b_faq_v_items" USING btree ("_order");
  CREATE INDEX "__services_v_b_faq_v_items_parent_id_idx" ON "__services_v_b_faq_v_items" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_faq_v_order_idx" ON "__services_v_b_faq_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_faq_v_parent_id_idx" ON "__services_v_b_faq_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_faq_v_path_idx" ON "__services_v_b_faq_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_cta_v_links_order_idx" ON "__services_v_b_cta_v_links" USING btree ("_order");
  CREATE INDEX "__services_v_b_cta_v_links_parent_id_idx" ON "__services_v_b_cta_v_links" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cta_v_order_idx" ON "__services_v_b_cta_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_cta_v_parent_id_idx" ON "__services_v_b_cta_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cta_v_path_idx" ON "__services_v_b_cta_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_cta_v_background_image_idx" ON "__services_v_b_cta_v" USING btree ("background_image_id");
  CREATE INDEX "__services_v_b_form_v_order_idx" ON "__services_v_b_form_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_form_v_parent_id_idx" ON "__services_v_b_form_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_form_v_path_idx" ON "__services_v_b_form_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_form_v_form_idx" ON "__services_v_b_form_v" USING btree ("form_id");
  CREATE INDEX "__services_v_b_gated_v_bullets_order_idx" ON "__services_v_b_gated_v_bullets" USING btree ("_order");
  CREATE INDEX "__services_v_b_gated_v_bullets_parent_id_idx" ON "__services_v_b_gated_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_gated_v_order_idx" ON "__services_v_b_gated_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_gated_v_parent_id_idx" ON "__services_v_b_gated_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_gated_v_path_idx" ON "__services_v_b_gated_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_gated_v_download_idx" ON "__services_v_b_gated_v" USING btree ("download_id");
  CREATE INDEX "__services_v_b_gated_v_cover_image_idx" ON "__services_v_b_gated_v" USING btree ("cover_image_id");
  CREATE INDEX "__services_v_b_dls_v_order_idx" ON "__services_v_b_dls_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_dls_v_parent_id_idx" ON "__services_v_b_dls_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_dls_v_path_idx" ON "__services_v_b_dls_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_dls_v_category_idx" ON "__services_v_b_dls_v" USING btree ("category_id");
  CREATE INDEX "__services_v_b_cont_v_columns_order_idx" ON "__services_v_b_cont_v_columns" USING btree ("_order");
  CREATE INDEX "__services_v_b_cont_v_columns_parent_id_idx" ON "__services_v_b_cont_v_columns" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cont_v_order_idx" ON "__services_v_b_cont_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_cont_v_parent_id_idx" ON "__services_v_b_cont_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_cont_v_path_idx" ON "__services_v_b_cont_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_med_v_order_idx" ON "__services_v_b_med_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_med_v_parent_id_idx" ON "__services_v_b_med_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_med_v_path_idx" ON "__services_v_b_med_v" USING btree ("_path");
  CREATE INDEX "__services_v_b_med_v_media_idx" ON "__services_v_b_med_v" USING btree ("media_id");
  CREATE INDEX "__services_v_b_arch_v_order_idx" ON "__services_v_b_arch_v" USING btree ("_order");
  CREATE INDEX "__services_v_b_arch_v_parent_id_idx" ON "__services_v_b_arch_v" USING btree ("_parent_id");
  CREATE INDEX "__services_v_b_arch_v_path_idx" ON "__services_v_b_arch_v" USING btree ("_path");
  CREATE INDEX "_services_v_version_deliverables_order_idx" ON "_services_v_version_deliverables" USING btree ("_order");
  CREATE INDEX "_services_v_version_deliverables_parent_id_idx" ON "_services_v_version_deliverables" USING btree ("_parent_id");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_version_featured_image_idx" ON "_services_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_services_v_version_version_parent_idx" ON "_services_v" USING btree ("version_parent_id");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_case_studies_id_idx" ON "_services_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_services_v_rels_locations_id_idx" ON "_services_v_rels" USING btree ("locations_id");
  CREATE INDEX "_services_v_rels_team_id_idx" ON "_services_v_rels" USING btree ("team_id");
  CREATE INDEX "_services_v_rels_downloads_id_idx" ON "_services_v_rels" USING btree ("downloads_id");
  CREATE INDEX "_services_v_rels_categories_id_idx" ON "_services_v_rels" USING btree ("categories_id");
  CREATE INDEX "_services_v_rels_testimonials_id_idx" ON "_services_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "case_studies_stats_order_idx" ON "case_studies_stats" USING btree ("_order");
  CREATE INDEX "case_studies_stats_parent_id_idx" ON "case_studies_stats" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_txtmed_bullets_order_idx" ON "case_studies_b_txtmed_bullets" USING btree ("_order");
  CREATE INDEX "case_studies_b_txtmed_bullets_parent_id_idx" ON "case_studies_b_txtmed_bullets" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_txtmed_links_order_idx" ON "case_studies_b_txtmed_links" USING btree ("_order");
  CREATE INDEX "case_studies_b_txtmed_links_parent_id_idx" ON "case_studies_b_txtmed_links" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_txtmed_order_idx" ON "case_studies_b_txtmed" USING btree ("_order");
  CREATE INDEX "case_studies_b_txtmed_parent_id_idx" ON "case_studies_b_txtmed" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_txtmed_path_idx" ON "case_studies_b_txtmed" USING btree ("_path");
  CREATE INDEX "case_studies_b_txtmed_media_idx" ON "case_studies_b_txtmed" USING btree ("media_id");
  CREATE INDEX "case_studies_b_cards_manual_cards_order_idx" ON "case_studies_b_cards_manual_cards" USING btree ("_order");
  CREATE INDEX "case_studies_b_cards_manual_cards_parent_id_idx" ON "case_studies_b_cards_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cards_manual_cards_image_idx" ON "case_studies_b_cards_manual_cards" USING btree ("image_id");
  CREATE INDEX "case_studies_b_cards_links_order_idx" ON "case_studies_b_cards_links" USING btree ("_order");
  CREATE INDEX "case_studies_b_cards_links_parent_id_idx" ON "case_studies_b_cards_links" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cards_order_idx" ON "case_studies_b_cards" USING btree ("_order");
  CREATE INDEX "case_studies_b_cards_parent_id_idx" ON "case_studies_b_cards" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cards_path_idx" ON "case_studies_b_cards" USING btree ("_path");
  CREATE INDEX "case_studies_b_feats_features_order_idx" ON "case_studies_b_feats_features" USING btree ("_order");
  CREATE INDEX "case_studies_b_feats_features_parent_id_idx" ON "case_studies_b_feats_features" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_feats_links_order_idx" ON "case_studies_b_feats_links" USING btree ("_order");
  CREATE INDEX "case_studies_b_feats_links_parent_id_idx" ON "case_studies_b_feats_links" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_feats_order_idx" ON "case_studies_b_feats" USING btree ("_order");
  CREATE INDEX "case_studies_b_feats_parent_id_idx" ON "case_studies_b_feats" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_feats_path_idx" ON "case_studies_b_feats" USING btree ("_path");
  CREATE INDEX "case_studies_b_gal_images_order_idx" ON "case_studies_b_gal_images" USING btree ("_order");
  CREATE INDEX "case_studies_b_gal_images_parent_id_idx" ON "case_studies_b_gal_images" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_gal_images_image_idx" ON "case_studies_b_gal_images" USING btree ("image_id");
  CREATE INDEX "case_studies_b_gal_order_idx" ON "case_studies_b_gal" USING btree ("_order");
  CREATE INDEX "case_studies_b_gal_parent_id_idx" ON "case_studies_b_gal" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_gal_path_idx" ON "case_studies_b_gal" USING btree ("_path");
  CREATE INDEX "case_studies_b_tstm_order_idx" ON "case_studies_b_tstm" USING btree ("_order");
  CREATE INDEX "case_studies_b_tstm_parent_id_idx" ON "case_studies_b_tstm" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_tstm_path_idx" ON "case_studies_b_tstm" USING btree ("_path");
  CREATE INDEX "case_studies_b_tstm_service_idx" ON "case_studies_b_tstm" USING btree ("service_id");
  CREATE INDEX "case_studies_b_faq_items_order_idx" ON "case_studies_b_faq_items" USING btree ("_order");
  CREATE INDEX "case_studies_b_faq_items_parent_id_idx" ON "case_studies_b_faq_items" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_faq_order_idx" ON "case_studies_b_faq" USING btree ("_order");
  CREATE INDEX "case_studies_b_faq_parent_id_idx" ON "case_studies_b_faq" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_faq_path_idx" ON "case_studies_b_faq" USING btree ("_path");
  CREATE INDEX "case_studies_b_cta_links_order_idx" ON "case_studies_b_cta_links" USING btree ("_order");
  CREATE INDEX "case_studies_b_cta_links_parent_id_idx" ON "case_studies_b_cta_links" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cta_order_idx" ON "case_studies_b_cta" USING btree ("_order");
  CREATE INDEX "case_studies_b_cta_parent_id_idx" ON "case_studies_b_cta" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cta_path_idx" ON "case_studies_b_cta" USING btree ("_path");
  CREATE INDEX "case_studies_b_cta_background_image_idx" ON "case_studies_b_cta" USING btree ("background_image_id");
  CREATE INDEX "case_studies_b_form_order_idx" ON "case_studies_b_form" USING btree ("_order");
  CREATE INDEX "case_studies_b_form_parent_id_idx" ON "case_studies_b_form" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_form_path_idx" ON "case_studies_b_form" USING btree ("_path");
  CREATE INDEX "case_studies_b_form_form_idx" ON "case_studies_b_form" USING btree ("form_id");
  CREATE INDEX "case_studies_b_gated_bullets_order_idx" ON "case_studies_b_gated_bullets" USING btree ("_order");
  CREATE INDEX "case_studies_b_gated_bullets_parent_id_idx" ON "case_studies_b_gated_bullets" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_gated_order_idx" ON "case_studies_b_gated" USING btree ("_order");
  CREATE INDEX "case_studies_b_gated_parent_id_idx" ON "case_studies_b_gated" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_gated_path_idx" ON "case_studies_b_gated" USING btree ("_path");
  CREATE INDEX "case_studies_b_gated_download_idx" ON "case_studies_b_gated" USING btree ("download_id");
  CREATE INDEX "case_studies_b_gated_cover_image_idx" ON "case_studies_b_gated" USING btree ("cover_image_id");
  CREATE INDEX "case_studies_b_dls_order_idx" ON "case_studies_b_dls" USING btree ("_order");
  CREATE INDEX "case_studies_b_dls_parent_id_idx" ON "case_studies_b_dls" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_dls_path_idx" ON "case_studies_b_dls" USING btree ("_path");
  CREATE INDEX "case_studies_b_dls_category_idx" ON "case_studies_b_dls" USING btree ("category_id");
  CREATE INDEX "case_studies_b_cont_columns_order_idx" ON "case_studies_b_cont_columns" USING btree ("_order");
  CREATE INDEX "case_studies_b_cont_columns_parent_id_idx" ON "case_studies_b_cont_columns" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cont_order_idx" ON "case_studies_b_cont" USING btree ("_order");
  CREATE INDEX "case_studies_b_cont_parent_id_idx" ON "case_studies_b_cont" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_cont_path_idx" ON "case_studies_b_cont" USING btree ("_path");
  CREATE INDEX "case_studies_b_med_order_idx" ON "case_studies_b_med" USING btree ("_order");
  CREATE INDEX "case_studies_b_med_parent_id_idx" ON "case_studies_b_med" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_med_path_idx" ON "case_studies_b_med" USING btree ("_path");
  CREATE INDEX "case_studies_b_med_media_idx" ON "case_studies_b_med" USING btree ("media_id");
  CREATE INDEX "case_studies_b_arch_order_idx" ON "case_studies_b_arch" USING btree ("_order");
  CREATE INDEX "case_studies_b_arch_parent_id_idx" ON "case_studies_b_arch" USING btree ("_parent_id");
  CREATE INDEX "case_studies_b_arch_path_idx" ON "case_studies_b_arch" USING btree ("_path");
  CREATE INDEX "case_studies_featured_image_idx" ON "case_studies" USING btree ("featured_image_id");
  CREATE INDEX "case_studies_location_idx" ON "case_studies" USING btree ("location_id");
  CREATE INDEX "case_studies_testimonial_idx" ON "case_studies" USING btree ("testimonial_id");
  CREATE INDEX "case_studies_meta_meta_image_idx" ON "case_studies" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies__status_idx" ON "case_studies" USING btree ("_status");
  CREATE INDEX "case_studies_rels_order_idx" ON "case_studies_rels" USING btree ("order");
  CREATE INDEX "case_studies_rels_parent_idx" ON "case_studies_rels" USING btree ("parent_id");
  CREATE INDEX "case_studies_rels_path_idx" ON "case_studies_rels" USING btree ("path");
  CREATE INDEX "case_studies_rels_services_id_idx" ON "case_studies_rels" USING btree ("services_id");
  CREATE INDEX "case_studies_rels_pages_id_idx" ON "case_studies_rels" USING btree ("pages_id");
  CREATE INDEX "case_studies_rels_posts_id_idx" ON "case_studies_rels" USING btree ("posts_id");
  CREATE INDEX "case_studies_rels_case_studies_id_idx" ON "case_studies_rels" USING btree ("case_studies_id");
  CREATE INDEX "case_studies_rels_locations_id_idx" ON "case_studies_rels" USING btree ("locations_id");
  CREATE INDEX "case_studies_rels_team_id_idx" ON "case_studies_rels" USING btree ("team_id");
  CREATE INDEX "case_studies_rels_downloads_id_idx" ON "case_studies_rels" USING btree ("downloads_id");
  CREATE INDEX "case_studies_rels_categories_id_idx" ON "case_studies_rels" USING btree ("categories_id");
  CREATE INDEX "case_studies_rels_testimonials_id_idx" ON "case_studies_rels" USING btree ("testimonials_id");
  CREATE INDEX "_case_studies_v_version_stats_order_idx" ON "_case_studies_v_version_stats" USING btree ("_order");
  CREATE INDEX "_case_studies_v_version_stats_parent_id_idx" ON "_case_studies_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_txtmed_v_bullets_order_idx" ON "__case_studies_v_b_txtmed_v_bullets" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_txtmed_v_bullets_parent_id_idx" ON "__case_studies_v_b_txtmed_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_txtmed_v_links_order_idx" ON "__case_studies_v_b_txtmed_v_links" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_txtmed_v_links_parent_id_idx" ON "__case_studies_v_b_txtmed_v_links" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_txtmed_v_order_idx" ON "__case_studies_v_b_txtmed_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_txtmed_v_parent_id_idx" ON "__case_studies_v_b_txtmed_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_txtmed_v_path_idx" ON "__case_studies_v_b_txtmed_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_txtmed_v_media_idx" ON "__case_studies_v_b_txtmed_v" USING btree ("media_id");
  CREATE INDEX "__case_studies_v_b_cards_v_manual_cards_order_idx" ON "__case_studies_v_b_cards_v_manual_cards" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cards_v_manual_cards_parent_id_idx" ON "__case_studies_v_b_cards_v_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cards_v_manual_cards_image_idx" ON "__case_studies_v_b_cards_v_manual_cards" USING btree ("image_id");
  CREATE INDEX "__case_studies_v_b_cards_v_links_order_idx" ON "__case_studies_v_b_cards_v_links" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cards_v_links_parent_id_idx" ON "__case_studies_v_b_cards_v_links" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cards_v_order_idx" ON "__case_studies_v_b_cards_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cards_v_parent_id_idx" ON "__case_studies_v_b_cards_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cards_v_path_idx" ON "__case_studies_v_b_cards_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_feats_v_features_order_idx" ON "__case_studies_v_b_feats_v_features" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_feats_v_features_parent_id_idx" ON "__case_studies_v_b_feats_v_features" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_feats_v_links_order_idx" ON "__case_studies_v_b_feats_v_links" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_feats_v_links_parent_id_idx" ON "__case_studies_v_b_feats_v_links" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_feats_v_order_idx" ON "__case_studies_v_b_feats_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_feats_v_parent_id_idx" ON "__case_studies_v_b_feats_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_feats_v_path_idx" ON "__case_studies_v_b_feats_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_gal_v_images_order_idx" ON "__case_studies_v_b_gal_v_images" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_gal_v_images_parent_id_idx" ON "__case_studies_v_b_gal_v_images" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_gal_v_images_image_idx" ON "__case_studies_v_b_gal_v_images" USING btree ("image_id");
  CREATE INDEX "__case_studies_v_b_gal_v_order_idx" ON "__case_studies_v_b_gal_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_gal_v_parent_id_idx" ON "__case_studies_v_b_gal_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_gal_v_path_idx" ON "__case_studies_v_b_gal_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_tstm_v_order_idx" ON "__case_studies_v_b_tstm_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_tstm_v_parent_id_idx" ON "__case_studies_v_b_tstm_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_tstm_v_path_idx" ON "__case_studies_v_b_tstm_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_tstm_v_service_idx" ON "__case_studies_v_b_tstm_v" USING btree ("service_id");
  CREATE INDEX "__case_studies_v_b_faq_v_items_order_idx" ON "__case_studies_v_b_faq_v_items" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_faq_v_items_parent_id_idx" ON "__case_studies_v_b_faq_v_items" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_faq_v_order_idx" ON "__case_studies_v_b_faq_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_faq_v_parent_id_idx" ON "__case_studies_v_b_faq_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_faq_v_path_idx" ON "__case_studies_v_b_faq_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_cta_v_links_order_idx" ON "__case_studies_v_b_cta_v_links" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cta_v_links_parent_id_idx" ON "__case_studies_v_b_cta_v_links" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cta_v_order_idx" ON "__case_studies_v_b_cta_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cta_v_parent_id_idx" ON "__case_studies_v_b_cta_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cta_v_path_idx" ON "__case_studies_v_b_cta_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_cta_v_background_image_idx" ON "__case_studies_v_b_cta_v" USING btree ("background_image_id");
  CREATE INDEX "__case_studies_v_b_form_v_order_idx" ON "__case_studies_v_b_form_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_form_v_parent_id_idx" ON "__case_studies_v_b_form_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_form_v_path_idx" ON "__case_studies_v_b_form_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_form_v_form_idx" ON "__case_studies_v_b_form_v" USING btree ("form_id");
  CREATE INDEX "__case_studies_v_b_gated_v_bullets_order_idx" ON "__case_studies_v_b_gated_v_bullets" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_gated_v_bullets_parent_id_idx" ON "__case_studies_v_b_gated_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_gated_v_order_idx" ON "__case_studies_v_b_gated_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_gated_v_parent_id_idx" ON "__case_studies_v_b_gated_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_gated_v_path_idx" ON "__case_studies_v_b_gated_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_gated_v_download_idx" ON "__case_studies_v_b_gated_v" USING btree ("download_id");
  CREATE INDEX "__case_studies_v_b_gated_v_cover_image_idx" ON "__case_studies_v_b_gated_v" USING btree ("cover_image_id");
  CREATE INDEX "__case_studies_v_b_dls_v_order_idx" ON "__case_studies_v_b_dls_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_dls_v_parent_id_idx" ON "__case_studies_v_b_dls_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_dls_v_path_idx" ON "__case_studies_v_b_dls_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_dls_v_category_idx" ON "__case_studies_v_b_dls_v" USING btree ("category_id");
  CREATE INDEX "__case_studies_v_b_cont_v_columns_order_idx" ON "__case_studies_v_b_cont_v_columns" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cont_v_columns_parent_id_idx" ON "__case_studies_v_b_cont_v_columns" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cont_v_order_idx" ON "__case_studies_v_b_cont_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_cont_v_parent_id_idx" ON "__case_studies_v_b_cont_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_cont_v_path_idx" ON "__case_studies_v_b_cont_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_med_v_order_idx" ON "__case_studies_v_b_med_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_med_v_parent_id_idx" ON "__case_studies_v_b_med_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_med_v_path_idx" ON "__case_studies_v_b_med_v" USING btree ("_path");
  CREATE INDEX "__case_studies_v_b_med_v_media_idx" ON "__case_studies_v_b_med_v" USING btree ("media_id");
  CREATE INDEX "__case_studies_v_b_arch_v_order_idx" ON "__case_studies_v_b_arch_v" USING btree ("_order");
  CREATE INDEX "__case_studies_v_b_arch_v_parent_id_idx" ON "__case_studies_v_b_arch_v" USING btree ("_parent_id");
  CREATE INDEX "__case_studies_v_b_arch_v_path_idx" ON "__case_studies_v_b_arch_v" USING btree ("_path");
  CREATE INDEX "_case_studies_v_parent_idx" ON "_case_studies_v" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_version_version_featured_image_idx" ON "_case_studies_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_case_studies_v_version_version_location_idx" ON "_case_studies_v" USING btree ("version_location_id");
  CREATE INDEX "_case_studies_v_version_version_testimonial_idx" ON "_case_studies_v" USING btree ("version_testimonial_id");
  CREATE INDEX "_case_studies_v_version_meta_version_meta_image_idx" ON "_case_studies_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_case_studies_v_version_version_slug_idx" ON "_case_studies_v" USING btree ("version_slug");
  CREATE INDEX "_case_studies_v_version_version_updated_at_idx" ON "_case_studies_v" USING btree ("version_updated_at");
  CREATE INDEX "_case_studies_v_version_version_created_at_idx" ON "_case_studies_v" USING btree ("version_created_at");
  CREATE INDEX "_case_studies_v_version_version__status_idx" ON "_case_studies_v" USING btree ("version__status");
  CREATE INDEX "_case_studies_v_created_at_idx" ON "_case_studies_v" USING btree ("created_at");
  CREATE INDEX "_case_studies_v_updated_at_idx" ON "_case_studies_v" USING btree ("updated_at");
  CREATE INDEX "_case_studies_v_latest_idx" ON "_case_studies_v" USING btree ("latest");
  CREATE INDEX "_case_studies_v_autosave_idx" ON "_case_studies_v" USING btree ("autosave");
  CREATE INDEX "_case_studies_v_rels_order_idx" ON "_case_studies_v_rels" USING btree ("order");
  CREATE INDEX "_case_studies_v_rels_parent_idx" ON "_case_studies_v_rels" USING btree ("parent_id");
  CREATE INDEX "_case_studies_v_rels_path_idx" ON "_case_studies_v_rels" USING btree ("path");
  CREATE INDEX "_case_studies_v_rels_services_id_idx" ON "_case_studies_v_rels" USING btree ("services_id");
  CREATE INDEX "_case_studies_v_rels_pages_id_idx" ON "_case_studies_v_rels" USING btree ("pages_id");
  CREATE INDEX "_case_studies_v_rels_posts_id_idx" ON "_case_studies_v_rels" USING btree ("posts_id");
  CREATE INDEX "_case_studies_v_rels_case_studies_id_idx" ON "_case_studies_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_case_studies_v_rels_locations_id_idx" ON "_case_studies_v_rels" USING btree ("locations_id");
  CREATE INDEX "_case_studies_v_rels_team_id_idx" ON "_case_studies_v_rels" USING btree ("team_id");
  CREATE INDEX "_case_studies_v_rels_downloads_id_idx" ON "_case_studies_v_rels" USING btree ("downloads_id");
  CREATE INDEX "_case_studies_v_rels_categories_id_idx" ON "_case_studies_v_rels" USING btree ("categories_id");
  CREATE INDEX "_case_studies_v_rels_testimonials_id_idx" ON "_case_studies_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "locations_postcodes_order_idx" ON "locations_postcodes" USING btree ("_order");
  CREATE INDEX "locations_postcodes_parent_id_idx" ON "locations_postcodes" USING btree ("_parent_id");
  CREATE INDEX "locations_b_txtmed_bullets_order_idx" ON "locations_b_txtmed_bullets" USING btree ("_order");
  CREATE INDEX "locations_b_txtmed_bullets_parent_id_idx" ON "locations_b_txtmed_bullets" USING btree ("_parent_id");
  CREATE INDEX "locations_b_txtmed_links_order_idx" ON "locations_b_txtmed_links" USING btree ("_order");
  CREATE INDEX "locations_b_txtmed_links_parent_id_idx" ON "locations_b_txtmed_links" USING btree ("_parent_id");
  CREATE INDEX "locations_b_txtmed_order_idx" ON "locations_b_txtmed" USING btree ("_order");
  CREATE INDEX "locations_b_txtmed_parent_id_idx" ON "locations_b_txtmed" USING btree ("_parent_id");
  CREATE INDEX "locations_b_txtmed_path_idx" ON "locations_b_txtmed" USING btree ("_path");
  CREATE INDEX "locations_b_txtmed_media_idx" ON "locations_b_txtmed" USING btree ("media_id");
  CREATE INDEX "locations_b_cards_manual_cards_order_idx" ON "locations_b_cards_manual_cards" USING btree ("_order");
  CREATE INDEX "locations_b_cards_manual_cards_parent_id_idx" ON "locations_b_cards_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cards_manual_cards_image_idx" ON "locations_b_cards_manual_cards" USING btree ("image_id");
  CREATE INDEX "locations_b_cards_links_order_idx" ON "locations_b_cards_links" USING btree ("_order");
  CREATE INDEX "locations_b_cards_links_parent_id_idx" ON "locations_b_cards_links" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cards_order_idx" ON "locations_b_cards" USING btree ("_order");
  CREATE INDEX "locations_b_cards_parent_id_idx" ON "locations_b_cards" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cards_path_idx" ON "locations_b_cards" USING btree ("_path");
  CREATE INDEX "locations_b_feats_features_order_idx" ON "locations_b_feats_features" USING btree ("_order");
  CREATE INDEX "locations_b_feats_features_parent_id_idx" ON "locations_b_feats_features" USING btree ("_parent_id");
  CREATE INDEX "locations_b_feats_links_order_idx" ON "locations_b_feats_links" USING btree ("_order");
  CREATE INDEX "locations_b_feats_links_parent_id_idx" ON "locations_b_feats_links" USING btree ("_parent_id");
  CREATE INDEX "locations_b_feats_order_idx" ON "locations_b_feats" USING btree ("_order");
  CREATE INDEX "locations_b_feats_parent_id_idx" ON "locations_b_feats" USING btree ("_parent_id");
  CREATE INDEX "locations_b_feats_path_idx" ON "locations_b_feats" USING btree ("_path");
  CREATE INDEX "locations_b_gal_images_order_idx" ON "locations_b_gal_images" USING btree ("_order");
  CREATE INDEX "locations_b_gal_images_parent_id_idx" ON "locations_b_gal_images" USING btree ("_parent_id");
  CREATE INDEX "locations_b_gal_images_image_idx" ON "locations_b_gal_images" USING btree ("image_id");
  CREATE INDEX "locations_b_gal_order_idx" ON "locations_b_gal" USING btree ("_order");
  CREATE INDEX "locations_b_gal_parent_id_idx" ON "locations_b_gal" USING btree ("_parent_id");
  CREATE INDEX "locations_b_gal_path_idx" ON "locations_b_gal" USING btree ("_path");
  CREATE INDEX "locations_b_tstm_order_idx" ON "locations_b_tstm" USING btree ("_order");
  CREATE INDEX "locations_b_tstm_parent_id_idx" ON "locations_b_tstm" USING btree ("_parent_id");
  CREATE INDEX "locations_b_tstm_path_idx" ON "locations_b_tstm" USING btree ("_path");
  CREATE INDEX "locations_b_tstm_service_idx" ON "locations_b_tstm" USING btree ("service_id");
  CREATE INDEX "locations_b_faq_items_order_idx" ON "locations_b_faq_items" USING btree ("_order");
  CREATE INDEX "locations_b_faq_items_parent_id_idx" ON "locations_b_faq_items" USING btree ("_parent_id");
  CREATE INDEX "locations_b_faq_order_idx" ON "locations_b_faq" USING btree ("_order");
  CREATE INDEX "locations_b_faq_parent_id_idx" ON "locations_b_faq" USING btree ("_parent_id");
  CREATE INDEX "locations_b_faq_path_idx" ON "locations_b_faq" USING btree ("_path");
  CREATE INDEX "locations_b_cta_links_order_idx" ON "locations_b_cta_links" USING btree ("_order");
  CREATE INDEX "locations_b_cta_links_parent_id_idx" ON "locations_b_cta_links" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cta_order_idx" ON "locations_b_cta" USING btree ("_order");
  CREATE INDEX "locations_b_cta_parent_id_idx" ON "locations_b_cta" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cta_path_idx" ON "locations_b_cta" USING btree ("_path");
  CREATE INDEX "locations_b_cta_background_image_idx" ON "locations_b_cta" USING btree ("background_image_id");
  CREATE INDEX "locations_b_form_order_idx" ON "locations_b_form" USING btree ("_order");
  CREATE INDEX "locations_b_form_parent_id_idx" ON "locations_b_form" USING btree ("_parent_id");
  CREATE INDEX "locations_b_form_path_idx" ON "locations_b_form" USING btree ("_path");
  CREATE INDEX "locations_b_form_form_idx" ON "locations_b_form" USING btree ("form_id");
  CREATE INDEX "locations_b_gated_bullets_order_idx" ON "locations_b_gated_bullets" USING btree ("_order");
  CREATE INDEX "locations_b_gated_bullets_parent_id_idx" ON "locations_b_gated_bullets" USING btree ("_parent_id");
  CREATE INDEX "locations_b_gated_order_idx" ON "locations_b_gated" USING btree ("_order");
  CREATE INDEX "locations_b_gated_parent_id_idx" ON "locations_b_gated" USING btree ("_parent_id");
  CREATE INDEX "locations_b_gated_path_idx" ON "locations_b_gated" USING btree ("_path");
  CREATE INDEX "locations_b_gated_download_idx" ON "locations_b_gated" USING btree ("download_id");
  CREATE INDEX "locations_b_gated_cover_image_idx" ON "locations_b_gated" USING btree ("cover_image_id");
  CREATE INDEX "locations_b_dls_order_idx" ON "locations_b_dls" USING btree ("_order");
  CREATE INDEX "locations_b_dls_parent_id_idx" ON "locations_b_dls" USING btree ("_parent_id");
  CREATE INDEX "locations_b_dls_path_idx" ON "locations_b_dls" USING btree ("_path");
  CREATE INDEX "locations_b_dls_category_idx" ON "locations_b_dls" USING btree ("category_id");
  CREATE INDEX "locations_b_cont_columns_order_idx" ON "locations_b_cont_columns" USING btree ("_order");
  CREATE INDEX "locations_b_cont_columns_parent_id_idx" ON "locations_b_cont_columns" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cont_order_idx" ON "locations_b_cont" USING btree ("_order");
  CREATE INDEX "locations_b_cont_parent_id_idx" ON "locations_b_cont" USING btree ("_parent_id");
  CREATE INDEX "locations_b_cont_path_idx" ON "locations_b_cont" USING btree ("_path");
  CREATE INDEX "locations_b_med_order_idx" ON "locations_b_med" USING btree ("_order");
  CREATE INDEX "locations_b_med_parent_id_idx" ON "locations_b_med" USING btree ("_parent_id");
  CREATE INDEX "locations_b_med_path_idx" ON "locations_b_med" USING btree ("_path");
  CREATE INDEX "locations_b_med_media_idx" ON "locations_b_med" USING btree ("media_id");
  CREATE INDEX "locations_b_arch_order_idx" ON "locations_b_arch" USING btree ("_order");
  CREATE INDEX "locations_b_arch_parent_id_idx" ON "locations_b_arch" USING btree ("_parent_id");
  CREATE INDEX "locations_b_arch_path_idx" ON "locations_b_arch" USING btree ("_path");
  CREATE INDEX "locations_featured_image_idx" ON "locations" USING btree ("featured_image_id");
  CREATE INDEX "locations_meta_meta_image_idx" ON "locations" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "locations__status_idx" ON "locations" USING btree ("_status");
  CREATE INDEX "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
  CREATE INDEX "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
  CREATE INDEX "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
  CREATE INDEX "locations_rels_locations_id_idx" ON "locations_rels" USING btree ("locations_id");
  CREATE INDEX "locations_rels_services_id_idx" ON "locations_rels" USING btree ("services_id");
  CREATE INDEX "locations_rels_pages_id_idx" ON "locations_rels" USING btree ("pages_id");
  CREATE INDEX "locations_rels_posts_id_idx" ON "locations_rels" USING btree ("posts_id");
  CREATE INDEX "locations_rels_case_studies_id_idx" ON "locations_rels" USING btree ("case_studies_id");
  CREATE INDEX "locations_rels_team_id_idx" ON "locations_rels" USING btree ("team_id");
  CREATE INDEX "locations_rels_downloads_id_idx" ON "locations_rels" USING btree ("downloads_id");
  CREATE INDEX "locations_rels_categories_id_idx" ON "locations_rels" USING btree ("categories_id");
  CREATE INDEX "locations_rels_testimonials_id_idx" ON "locations_rels" USING btree ("testimonials_id");
  CREATE INDEX "_locations_v_version_postcodes_order_idx" ON "_locations_v_version_postcodes" USING btree ("_order");
  CREATE INDEX "_locations_v_version_postcodes_parent_id_idx" ON "_locations_v_version_postcodes" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_txtmed_v_bullets_order_idx" ON "__locations_v_b_txtmed_v_bullets" USING btree ("_order");
  CREATE INDEX "__locations_v_b_txtmed_v_bullets_parent_id_idx" ON "__locations_v_b_txtmed_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_txtmed_v_links_order_idx" ON "__locations_v_b_txtmed_v_links" USING btree ("_order");
  CREATE INDEX "__locations_v_b_txtmed_v_links_parent_id_idx" ON "__locations_v_b_txtmed_v_links" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_txtmed_v_order_idx" ON "__locations_v_b_txtmed_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_txtmed_v_parent_id_idx" ON "__locations_v_b_txtmed_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_txtmed_v_path_idx" ON "__locations_v_b_txtmed_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_txtmed_v_media_idx" ON "__locations_v_b_txtmed_v" USING btree ("media_id");
  CREATE INDEX "__locations_v_b_cards_v_manual_cards_order_idx" ON "__locations_v_b_cards_v_manual_cards" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cards_v_manual_cards_parent_id_idx" ON "__locations_v_b_cards_v_manual_cards" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cards_v_manual_cards_image_idx" ON "__locations_v_b_cards_v_manual_cards" USING btree ("image_id");
  CREATE INDEX "__locations_v_b_cards_v_links_order_idx" ON "__locations_v_b_cards_v_links" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cards_v_links_parent_id_idx" ON "__locations_v_b_cards_v_links" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cards_v_order_idx" ON "__locations_v_b_cards_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cards_v_parent_id_idx" ON "__locations_v_b_cards_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cards_v_path_idx" ON "__locations_v_b_cards_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_feats_v_features_order_idx" ON "__locations_v_b_feats_v_features" USING btree ("_order");
  CREATE INDEX "__locations_v_b_feats_v_features_parent_id_idx" ON "__locations_v_b_feats_v_features" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_feats_v_links_order_idx" ON "__locations_v_b_feats_v_links" USING btree ("_order");
  CREATE INDEX "__locations_v_b_feats_v_links_parent_id_idx" ON "__locations_v_b_feats_v_links" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_feats_v_order_idx" ON "__locations_v_b_feats_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_feats_v_parent_id_idx" ON "__locations_v_b_feats_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_feats_v_path_idx" ON "__locations_v_b_feats_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_gal_v_images_order_idx" ON "__locations_v_b_gal_v_images" USING btree ("_order");
  CREATE INDEX "__locations_v_b_gal_v_images_parent_id_idx" ON "__locations_v_b_gal_v_images" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_gal_v_images_image_idx" ON "__locations_v_b_gal_v_images" USING btree ("image_id");
  CREATE INDEX "__locations_v_b_gal_v_order_idx" ON "__locations_v_b_gal_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_gal_v_parent_id_idx" ON "__locations_v_b_gal_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_gal_v_path_idx" ON "__locations_v_b_gal_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_tstm_v_order_idx" ON "__locations_v_b_tstm_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_tstm_v_parent_id_idx" ON "__locations_v_b_tstm_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_tstm_v_path_idx" ON "__locations_v_b_tstm_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_tstm_v_service_idx" ON "__locations_v_b_tstm_v" USING btree ("service_id");
  CREATE INDEX "__locations_v_b_faq_v_items_order_idx" ON "__locations_v_b_faq_v_items" USING btree ("_order");
  CREATE INDEX "__locations_v_b_faq_v_items_parent_id_idx" ON "__locations_v_b_faq_v_items" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_faq_v_order_idx" ON "__locations_v_b_faq_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_faq_v_parent_id_idx" ON "__locations_v_b_faq_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_faq_v_path_idx" ON "__locations_v_b_faq_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_cta_v_links_order_idx" ON "__locations_v_b_cta_v_links" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cta_v_links_parent_id_idx" ON "__locations_v_b_cta_v_links" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cta_v_order_idx" ON "__locations_v_b_cta_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cta_v_parent_id_idx" ON "__locations_v_b_cta_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cta_v_path_idx" ON "__locations_v_b_cta_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_cta_v_background_image_idx" ON "__locations_v_b_cta_v" USING btree ("background_image_id");
  CREATE INDEX "__locations_v_b_form_v_order_idx" ON "__locations_v_b_form_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_form_v_parent_id_idx" ON "__locations_v_b_form_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_form_v_path_idx" ON "__locations_v_b_form_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_form_v_form_idx" ON "__locations_v_b_form_v" USING btree ("form_id");
  CREATE INDEX "__locations_v_b_gated_v_bullets_order_idx" ON "__locations_v_b_gated_v_bullets" USING btree ("_order");
  CREATE INDEX "__locations_v_b_gated_v_bullets_parent_id_idx" ON "__locations_v_b_gated_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_gated_v_order_idx" ON "__locations_v_b_gated_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_gated_v_parent_id_idx" ON "__locations_v_b_gated_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_gated_v_path_idx" ON "__locations_v_b_gated_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_gated_v_download_idx" ON "__locations_v_b_gated_v" USING btree ("download_id");
  CREATE INDEX "__locations_v_b_gated_v_cover_image_idx" ON "__locations_v_b_gated_v" USING btree ("cover_image_id");
  CREATE INDEX "__locations_v_b_dls_v_order_idx" ON "__locations_v_b_dls_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_dls_v_parent_id_idx" ON "__locations_v_b_dls_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_dls_v_path_idx" ON "__locations_v_b_dls_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_dls_v_category_idx" ON "__locations_v_b_dls_v" USING btree ("category_id");
  CREATE INDEX "__locations_v_b_cont_v_columns_order_idx" ON "__locations_v_b_cont_v_columns" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cont_v_columns_parent_id_idx" ON "__locations_v_b_cont_v_columns" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cont_v_order_idx" ON "__locations_v_b_cont_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_cont_v_parent_id_idx" ON "__locations_v_b_cont_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_cont_v_path_idx" ON "__locations_v_b_cont_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_med_v_order_idx" ON "__locations_v_b_med_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_med_v_parent_id_idx" ON "__locations_v_b_med_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_med_v_path_idx" ON "__locations_v_b_med_v" USING btree ("_path");
  CREATE INDEX "__locations_v_b_med_v_media_idx" ON "__locations_v_b_med_v" USING btree ("media_id");
  CREATE INDEX "__locations_v_b_arch_v_order_idx" ON "__locations_v_b_arch_v" USING btree ("_order");
  CREATE INDEX "__locations_v_b_arch_v_parent_id_idx" ON "__locations_v_b_arch_v" USING btree ("_parent_id");
  CREATE INDEX "__locations_v_b_arch_v_path_idx" ON "__locations_v_b_arch_v" USING btree ("_path");
  CREATE INDEX "_locations_v_parent_idx" ON "_locations_v" USING btree ("parent_id");
  CREATE INDEX "_locations_v_version_version_featured_image_idx" ON "_locations_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_locations_v_version_meta_version_meta_image_idx" ON "_locations_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_locations_v_version_version_slug_idx" ON "_locations_v" USING btree ("version_slug");
  CREATE INDEX "_locations_v_version_version_updated_at_idx" ON "_locations_v" USING btree ("version_updated_at");
  CREATE INDEX "_locations_v_version_version_created_at_idx" ON "_locations_v" USING btree ("version_created_at");
  CREATE INDEX "_locations_v_version_version__status_idx" ON "_locations_v" USING btree ("version__status");
  CREATE INDEX "_locations_v_created_at_idx" ON "_locations_v" USING btree ("created_at");
  CREATE INDEX "_locations_v_updated_at_idx" ON "_locations_v" USING btree ("updated_at");
  CREATE INDEX "_locations_v_latest_idx" ON "_locations_v" USING btree ("latest");
  CREATE INDEX "_locations_v_autosave_idx" ON "_locations_v" USING btree ("autosave");
  CREATE INDEX "_locations_v_rels_order_idx" ON "_locations_v_rels" USING btree ("order");
  CREATE INDEX "_locations_v_rels_parent_idx" ON "_locations_v_rels" USING btree ("parent_id");
  CREATE INDEX "_locations_v_rels_path_idx" ON "_locations_v_rels" USING btree ("path");
  CREATE INDEX "_locations_v_rels_locations_id_idx" ON "_locations_v_rels" USING btree ("locations_id");
  CREATE INDEX "_locations_v_rels_services_id_idx" ON "_locations_v_rels" USING btree ("services_id");
  CREATE INDEX "_locations_v_rels_pages_id_idx" ON "_locations_v_rels" USING btree ("pages_id");
  CREATE INDEX "_locations_v_rels_posts_id_idx" ON "_locations_v_rels" USING btree ("posts_id");
  CREATE INDEX "_locations_v_rels_case_studies_id_idx" ON "_locations_v_rels" USING btree ("case_studies_id");
  CREATE INDEX "_locations_v_rels_team_id_idx" ON "_locations_v_rels" USING btree ("team_id");
  CREATE INDEX "_locations_v_rels_downloads_id_idx" ON "_locations_v_rels" USING btree ("downloads_id");
  CREATE INDEX "_locations_v_rels_categories_id_idx" ON "_locations_v_rels" USING btree ("categories_id");
  CREATE INDEX "_locations_v_rels_testimonials_id_idx" ON "_locations_v_rels" USING btree ("testimonials_id");
  CREATE INDEX "testimonials_author_photo_idx" ON "testimonials" USING btree ("author_photo_id");
  CREATE INDEX "testimonials_project_image_idx" ON "testimonials" USING btree ("project_image_id");
  CREATE INDEX "testimonials_related_location_idx" ON "testimonials" USING btree ("related_location_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "testimonials_rels_order_idx" ON "testimonials_rels" USING btree ("order");
  CREATE INDEX "testimonials_rels_parent_idx" ON "testimonials_rels" USING btree ("parent_id");
  CREATE INDEX "testimonials_rels_path_idx" ON "testimonials_rels" USING btree ("path");
  CREATE INDEX "testimonials_rels_services_id_idx" ON "testimonials_rels" USING btree ("services_id");
  CREATE INDEX "team_qualifications_order_idx" ON "team_qualifications" USING btree ("_order");
  CREATE INDEX "team_qualifications_parent_id_idx" ON "team_qualifications" USING btree ("_parent_id");
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_meta_meta_image_idx" ON "team" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "team_slug_idx" ON "team" USING btree ("slug");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE INDEX "team_rels_order_idx" ON "team_rels" USING btree ("order");
  CREATE INDEX "team_rels_parent_idx" ON "team_rels" USING btree ("parent_id");
  CREATE INDEX "team_rels_path_idx" ON "team_rels" USING btree ("path");
  CREATE INDEX "team_rels_services_id_idx" ON "team_rels" USING btree ("services_id");
  CREATE INDEX "downloads_category_idx" ON "downloads" USING btree ("category_id");
  CREATE INDEX "downloads_thumbnail_idx" ON "downloads" USING btree ("thumbnail_id");
  CREATE INDEX "downloads_meta_meta_image_idx" ON "downloads" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "downloads_slug_idx" ON "downloads" USING btree ("slug");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  CREATE UNIQUE INDEX "downloads_filename_idx" ON "downloads" USING btree ("filename");
  CREATE INDEX "downloads_rels_order_idx" ON "downloads_rels" USING btree ("order");
  CREATE INDEX "downloads_rels_parent_idx" ON "downloads_rels" USING btree ("parent_id");
  CREATE INDEX "downloads_rels_path_idx" ON "downloads_rels" USING btree ("path");
  CREATE INDEX "downloads_rels_services_id_idx" ON "downloads_rels" USING btree ("services_id");
  CREATE INDEX "download_requests_email_idx" ON "download_requests" USING btree ("email");
  CREATE INDEX "download_requests_download_idx" ON "download_requests" USING btree ("download_id");
  CREATE INDEX "download_requests_updated_at_idx" ON "download_requests" USING btree ("updated_at");
  CREATE INDEX "download_requests_created_at_idx" ON "download_requests" USING btree ("created_at");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_services_id_idx" ON "redirects_rels" USING btree ("services_id");
  CREATE INDEX "redirects_rels_case_studies_id_idx" ON "redirects_rels" USING btree ("case_studies_id");
  CREATE INDEX "redirects_rels_locations_id_idx" ON "redirects_rels" USING btree ("locations_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_b_step_order_idx" ON "forms_b_step" USING btree ("_order");
  CREATE INDEX "forms_b_step_parent_id_idx" ON "forms_b_step" USING btree ("_parent_id");
  CREATE INDEX "forms_b_step_path_idx" ON "forms_b_step" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_services_id_idx" ON "search_rels" USING btree ("services_id");
  CREATE INDEX "search_rels_case_studies_id_idx" ON "search_rels" USING btree ("case_studies_id");
  CREATE INDEX "search_rels_locations_id_idx" ON "search_rels" USING btree ("locations_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");
  CREATE INDEX "payload_locked_documents_rels_download_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("download_requests_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_megamenu_columns_links_order_idx" ON "header_nav_items_megamenu_columns_links" USING btree ("_order");
  CREATE INDEX "header_nav_items_megamenu_columns_links_parent_id_idx" ON "header_nav_items_megamenu_columns_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_megamenu_columns_order_idx" ON "header_nav_items_megamenu_columns" USING btree ("_order");
  CREATE INDEX "header_nav_items_megamenu_columns_parent_id_idx" ON "header_nav_items_megamenu_columns" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_megamenu_featured_megamenu_featured_ima_idx" ON "header_nav_items" USING btree ("megamenu_featured_image_id");
  CREATE INDEX "header_ctas_order_idx" ON "header_ctas" USING btree ("_order");
  CREATE INDEX "header_ctas_parent_id_idx" ON "header_ctas" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_case_studies_id_idx" ON "header_rels" USING btree ("case_studies_id");
  CREATE INDEX "header_rels_locations_id_idx" ON "header_rels" USING btree ("locations_id");
  CREATE INDEX "header_rels_team_id_idx" ON "header_rels" USING btree ("team_id");
  CREATE INDEX "header_rels_downloads_id_idx" ON "header_rels" USING btree ("downloads_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_newsletter_newsletter_form_idx" ON "footer" USING btree ("newsletter_form_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "footer_rels_case_studies_id_idx" ON "footer_rels" USING btree ("case_studies_id");
  CREATE INDEX "footer_rels_locations_id_idx" ON "footer_rels" USING btree ("locations_id");
  CREATE INDEX "footer_rels_team_id_idx" ON "footer_rels" USING btree ("team_id");
  CREATE INDEX "footer_rels_downloads_id_idx" ON "footer_rels" USING btree ("downloads_id");
  CREATE INDEX "site_settings_opening_hours_days_order_idx" ON "site_settings_opening_hours_days" USING btree ("order");
  CREATE INDEX "site_settings_opening_hours_days_parent_idx" ON "site_settings_opening_hours_days" USING btree ("parent_id");
  CREATE INDEX "site_settings_opening_hours_order_idx" ON "site_settings_opening_hours" USING btree ("_order");
  CREATE INDEX "site_settings_opening_hours_parent_id_idx" ON "site_settings_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "site_settings_accreditations_order_idx" ON "site_settings_accreditations" USING btree ("_order");
  CREATE INDEX "site_settings_accreditations_parent_id_idx" ON "site_settings_accreditations" USING btree ("_parent_id");
  CREATE INDEX "site_settings_accreditations_logo_idx" ON "site_settings_accreditations" USING btree ("logo_id");
  CREATE INDEX "site_settings_social_profiles_order_idx" ON "site_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "site_settings_social_profiles_parent_id_idx" ON "site_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "site_settings_enquiry_recipients_order_idx" ON "site_settings_enquiry_recipients" USING btree ("_order");
  CREATE INDEX "site_settings_enquiry_recipients_parent_id_idx" ON "site_settings_enquiry_recipients" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_mark_idx" ON "site_settings" USING btree ("logo_mark_id");
  CREATE INDEX "site_settings_default_meta_image_idx" ON "site_settings" USING btree ("default_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_b_hero_links" CASCADE;
  DROP TABLE "pages_b_hero_trust_signals" CASCADE;
  DROP TABLE "pages_b_hero" CASCADE;
  DROP TABLE "pages_b_txtmed_bullets" CASCADE;
  DROP TABLE "pages_b_txtmed_links" CASCADE;
  DROP TABLE "pages_b_txtmed" CASCADE;
  DROP TABLE "pages_b_cards_manual_cards" CASCADE;
  DROP TABLE "pages_b_cards_links" CASCADE;
  DROP TABLE "pages_b_cards" CASCADE;
  DROP TABLE "pages_b_feats_features" CASCADE;
  DROP TABLE "pages_b_feats_links" CASCADE;
  DROP TABLE "pages_b_feats" CASCADE;
  DROP TABLE "pages_b_gal_images" CASCADE;
  DROP TABLE "pages_b_gal" CASCADE;
  DROP TABLE "pages_b_tstm" CASCADE;
  DROP TABLE "pages_b_faq_items" CASCADE;
  DROP TABLE "pages_b_faq" CASCADE;
  DROP TABLE "pages_b_cta_links" CASCADE;
  DROP TABLE "pages_b_cta" CASCADE;
  DROP TABLE "pages_b_form" CASCADE;
  DROP TABLE "pages_b_gated_bullets" CASCADE;
  DROP TABLE "pages_b_gated" CASCADE;
  DROP TABLE "pages_b_dls" CASCADE;
  DROP TABLE "pages_b_cont_columns" CASCADE;
  DROP TABLE "pages_b_cont" CASCADE;
  DROP TABLE "pages_b_med" CASCADE;
  DROP TABLE "pages_b_arch" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "__pages_v_b_hero_v_links" CASCADE;
  DROP TABLE "__pages_v_b_hero_v_trust_signals" CASCADE;
  DROP TABLE "__pages_v_b_hero_v" CASCADE;
  DROP TABLE "__pages_v_b_txtmed_v_bullets" CASCADE;
  DROP TABLE "__pages_v_b_txtmed_v_links" CASCADE;
  DROP TABLE "__pages_v_b_txtmed_v" CASCADE;
  DROP TABLE "__pages_v_b_cards_v_manual_cards" CASCADE;
  DROP TABLE "__pages_v_b_cards_v_links" CASCADE;
  DROP TABLE "__pages_v_b_cards_v" CASCADE;
  DROP TABLE "__pages_v_b_feats_v_features" CASCADE;
  DROP TABLE "__pages_v_b_feats_v_links" CASCADE;
  DROP TABLE "__pages_v_b_feats_v" CASCADE;
  DROP TABLE "__pages_v_b_gal_v_images" CASCADE;
  DROP TABLE "__pages_v_b_gal_v" CASCADE;
  DROP TABLE "__pages_v_b_tstm_v" CASCADE;
  DROP TABLE "__pages_v_b_faq_v_items" CASCADE;
  DROP TABLE "__pages_v_b_faq_v" CASCADE;
  DROP TABLE "__pages_v_b_cta_v_links" CASCADE;
  DROP TABLE "__pages_v_b_cta_v" CASCADE;
  DROP TABLE "__pages_v_b_form_v" CASCADE;
  DROP TABLE "__pages_v_b_gated_v_bullets" CASCADE;
  DROP TABLE "__pages_v_b_gated_v" CASCADE;
  DROP TABLE "__pages_v_b_dls_v" CASCADE;
  DROP TABLE "__pages_v_b_cont_v_columns" CASCADE;
  DROP TABLE "__pages_v_b_cont_v" CASCADE;
  DROP TABLE "__pages_v_b_med_v" CASCADE;
  DROP TABLE "__pages_v_b_arch_v" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_b_txtmed_bullets" CASCADE;
  DROP TABLE "posts_b_txtmed_links" CASCADE;
  DROP TABLE "posts_b_txtmed" CASCADE;
  DROP TABLE "posts_b_cards_manual_cards" CASCADE;
  DROP TABLE "posts_b_cards_links" CASCADE;
  DROP TABLE "posts_b_cards" CASCADE;
  DROP TABLE "posts_b_feats_features" CASCADE;
  DROP TABLE "posts_b_feats_links" CASCADE;
  DROP TABLE "posts_b_feats" CASCADE;
  DROP TABLE "posts_b_gal_images" CASCADE;
  DROP TABLE "posts_b_gal" CASCADE;
  DROP TABLE "posts_b_tstm" CASCADE;
  DROP TABLE "posts_b_faq_items" CASCADE;
  DROP TABLE "posts_b_faq" CASCADE;
  DROP TABLE "posts_b_cta_links" CASCADE;
  DROP TABLE "posts_b_cta" CASCADE;
  DROP TABLE "posts_b_form" CASCADE;
  DROP TABLE "posts_b_gated_bullets" CASCADE;
  DROP TABLE "posts_b_gated" CASCADE;
  DROP TABLE "posts_b_dls" CASCADE;
  DROP TABLE "posts_b_cont_columns" CASCADE;
  DROP TABLE "posts_b_cont" CASCADE;
  DROP TABLE "posts_b_med" CASCADE;
  DROP TABLE "posts_b_arch" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "__posts_v_b_txtmed_v_bullets" CASCADE;
  DROP TABLE "__posts_v_b_txtmed_v_links" CASCADE;
  DROP TABLE "__posts_v_b_txtmed_v" CASCADE;
  DROP TABLE "__posts_v_b_cards_v_manual_cards" CASCADE;
  DROP TABLE "__posts_v_b_cards_v_links" CASCADE;
  DROP TABLE "__posts_v_b_cards_v" CASCADE;
  DROP TABLE "__posts_v_b_feats_v_features" CASCADE;
  DROP TABLE "__posts_v_b_feats_v_links" CASCADE;
  DROP TABLE "__posts_v_b_feats_v" CASCADE;
  DROP TABLE "__posts_v_b_gal_v_images" CASCADE;
  DROP TABLE "__posts_v_b_gal_v" CASCADE;
  DROP TABLE "__posts_v_b_tstm_v" CASCADE;
  DROP TABLE "__posts_v_b_faq_v_items" CASCADE;
  DROP TABLE "__posts_v_b_faq_v" CASCADE;
  DROP TABLE "__posts_v_b_cta_v_links" CASCADE;
  DROP TABLE "__posts_v_b_cta_v" CASCADE;
  DROP TABLE "__posts_v_b_form_v" CASCADE;
  DROP TABLE "__posts_v_b_gated_v_bullets" CASCADE;
  DROP TABLE "__posts_v_b_gated_v" CASCADE;
  DROP TABLE "__posts_v_b_dls_v" CASCADE;
  DROP TABLE "__posts_v_b_cont_v_columns" CASCADE;
  DROP TABLE "__posts_v_b_cont_v" CASCADE;
  DROP TABLE "__posts_v_b_med_v" CASCADE;
  DROP TABLE "__posts_v_b_arch_v" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "services_b_txtmed_bullets" CASCADE;
  DROP TABLE "services_b_txtmed_links" CASCADE;
  DROP TABLE "services_b_txtmed" CASCADE;
  DROP TABLE "services_b_cards_manual_cards" CASCADE;
  DROP TABLE "services_b_cards_links" CASCADE;
  DROP TABLE "services_b_cards" CASCADE;
  DROP TABLE "services_b_feats_features" CASCADE;
  DROP TABLE "services_b_feats_links" CASCADE;
  DROP TABLE "services_b_feats" CASCADE;
  DROP TABLE "services_b_gal_images" CASCADE;
  DROP TABLE "services_b_gal" CASCADE;
  DROP TABLE "services_b_tstm" CASCADE;
  DROP TABLE "services_b_faq_items" CASCADE;
  DROP TABLE "services_b_faq" CASCADE;
  DROP TABLE "services_b_cta_links" CASCADE;
  DROP TABLE "services_b_cta" CASCADE;
  DROP TABLE "services_b_form" CASCADE;
  DROP TABLE "services_b_gated_bullets" CASCADE;
  DROP TABLE "services_b_gated" CASCADE;
  DROP TABLE "services_b_dls" CASCADE;
  DROP TABLE "services_b_cont_columns" CASCADE;
  DROP TABLE "services_b_cont" CASCADE;
  DROP TABLE "services_b_med" CASCADE;
  DROP TABLE "services_b_arch" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "__services_v_b_txtmed_v_bullets" CASCADE;
  DROP TABLE "__services_v_b_txtmed_v_links" CASCADE;
  DROP TABLE "__services_v_b_txtmed_v" CASCADE;
  DROP TABLE "__services_v_b_cards_v_manual_cards" CASCADE;
  DROP TABLE "__services_v_b_cards_v_links" CASCADE;
  DROP TABLE "__services_v_b_cards_v" CASCADE;
  DROP TABLE "__services_v_b_feats_v_features" CASCADE;
  DROP TABLE "__services_v_b_feats_v_links" CASCADE;
  DROP TABLE "__services_v_b_feats_v" CASCADE;
  DROP TABLE "__services_v_b_gal_v_images" CASCADE;
  DROP TABLE "__services_v_b_gal_v" CASCADE;
  DROP TABLE "__services_v_b_tstm_v" CASCADE;
  DROP TABLE "__services_v_b_faq_v_items" CASCADE;
  DROP TABLE "__services_v_b_faq_v" CASCADE;
  DROP TABLE "__services_v_b_cta_v_links" CASCADE;
  DROP TABLE "__services_v_b_cta_v" CASCADE;
  DROP TABLE "__services_v_b_form_v" CASCADE;
  DROP TABLE "__services_v_b_gated_v_bullets" CASCADE;
  DROP TABLE "__services_v_b_gated_v" CASCADE;
  DROP TABLE "__services_v_b_dls_v" CASCADE;
  DROP TABLE "__services_v_b_cont_v_columns" CASCADE;
  DROP TABLE "__services_v_b_cont_v" CASCADE;
  DROP TABLE "__services_v_b_med_v" CASCADE;
  DROP TABLE "__services_v_b_arch_v" CASCADE;
  DROP TABLE "_services_v_version_deliverables" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "case_studies_stats" CASCADE;
  DROP TABLE "case_studies_b_txtmed_bullets" CASCADE;
  DROP TABLE "case_studies_b_txtmed_links" CASCADE;
  DROP TABLE "case_studies_b_txtmed" CASCADE;
  DROP TABLE "case_studies_b_cards_manual_cards" CASCADE;
  DROP TABLE "case_studies_b_cards_links" CASCADE;
  DROP TABLE "case_studies_b_cards" CASCADE;
  DROP TABLE "case_studies_b_feats_features" CASCADE;
  DROP TABLE "case_studies_b_feats_links" CASCADE;
  DROP TABLE "case_studies_b_feats" CASCADE;
  DROP TABLE "case_studies_b_gal_images" CASCADE;
  DROP TABLE "case_studies_b_gal" CASCADE;
  DROP TABLE "case_studies_b_tstm" CASCADE;
  DROP TABLE "case_studies_b_faq_items" CASCADE;
  DROP TABLE "case_studies_b_faq" CASCADE;
  DROP TABLE "case_studies_b_cta_links" CASCADE;
  DROP TABLE "case_studies_b_cta" CASCADE;
  DROP TABLE "case_studies_b_form" CASCADE;
  DROP TABLE "case_studies_b_gated_bullets" CASCADE;
  DROP TABLE "case_studies_b_gated" CASCADE;
  DROP TABLE "case_studies_b_dls" CASCADE;
  DROP TABLE "case_studies_b_cont_columns" CASCADE;
  DROP TABLE "case_studies_b_cont" CASCADE;
  DROP TABLE "case_studies_b_med" CASCADE;
  DROP TABLE "case_studies_b_arch" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_rels" CASCADE;
  DROP TABLE "_case_studies_v_version_stats" CASCADE;
  DROP TABLE "__case_studies_v_b_txtmed_v_bullets" CASCADE;
  DROP TABLE "__case_studies_v_b_txtmed_v_links" CASCADE;
  DROP TABLE "__case_studies_v_b_txtmed_v" CASCADE;
  DROP TABLE "__case_studies_v_b_cards_v_manual_cards" CASCADE;
  DROP TABLE "__case_studies_v_b_cards_v_links" CASCADE;
  DROP TABLE "__case_studies_v_b_cards_v" CASCADE;
  DROP TABLE "__case_studies_v_b_feats_v_features" CASCADE;
  DROP TABLE "__case_studies_v_b_feats_v_links" CASCADE;
  DROP TABLE "__case_studies_v_b_feats_v" CASCADE;
  DROP TABLE "__case_studies_v_b_gal_v_images" CASCADE;
  DROP TABLE "__case_studies_v_b_gal_v" CASCADE;
  DROP TABLE "__case_studies_v_b_tstm_v" CASCADE;
  DROP TABLE "__case_studies_v_b_faq_v_items" CASCADE;
  DROP TABLE "__case_studies_v_b_faq_v" CASCADE;
  DROP TABLE "__case_studies_v_b_cta_v_links" CASCADE;
  DROP TABLE "__case_studies_v_b_cta_v" CASCADE;
  DROP TABLE "__case_studies_v_b_form_v" CASCADE;
  DROP TABLE "__case_studies_v_b_gated_v_bullets" CASCADE;
  DROP TABLE "__case_studies_v_b_gated_v" CASCADE;
  DROP TABLE "__case_studies_v_b_dls_v" CASCADE;
  DROP TABLE "__case_studies_v_b_cont_v_columns" CASCADE;
  DROP TABLE "__case_studies_v_b_cont_v" CASCADE;
  DROP TABLE "__case_studies_v_b_med_v" CASCADE;
  DROP TABLE "__case_studies_v_b_arch_v" CASCADE;
  DROP TABLE "_case_studies_v" CASCADE;
  DROP TABLE "_case_studies_v_rels" CASCADE;
  DROP TABLE "locations_postcodes" CASCADE;
  DROP TABLE "locations_b_txtmed_bullets" CASCADE;
  DROP TABLE "locations_b_txtmed_links" CASCADE;
  DROP TABLE "locations_b_txtmed" CASCADE;
  DROP TABLE "locations_b_cards_manual_cards" CASCADE;
  DROP TABLE "locations_b_cards_links" CASCADE;
  DROP TABLE "locations_b_cards" CASCADE;
  DROP TABLE "locations_b_feats_features" CASCADE;
  DROP TABLE "locations_b_feats_links" CASCADE;
  DROP TABLE "locations_b_feats" CASCADE;
  DROP TABLE "locations_b_gal_images" CASCADE;
  DROP TABLE "locations_b_gal" CASCADE;
  DROP TABLE "locations_b_tstm" CASCADE;
  DROP TABLE "locations_b_faq_items" CASCADE;
  DROP TABLE "locations_b_faq" CASCADE;
  DROP TABLE "locations_b_cta_links" CASCADE;
  DROP TABLE "locations_b_cta" CASCADE;
  DROP TABLE "locations_b_form" CASCADE;
  DROP TABLE "locations_b_gated_bullets" CASCADE;
  DROP TABLE "locations_b_gated" CASCADE;
  DROP TABLE "locations_b_dls" CASCADE;
  DROP TABLE "locations_b_cont_columns" CASCADE;
  DROP TABLE "locations_b_cont" CASCADE;
  DROP TABLE "locations_b_med" CASCADE;
  DROP TABLE "locations_b_arch" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_rels" CASCADE;
  DROP TABLE "_locations_v_version_postcodes" CASCADE;
  DROP TABLE "__locations_v_b_txtmed_v_bullets" CASCADE;
  DROP TABLE "__locations_v_b_txtmed_v_links" CASCADE;
  DROP TABLE "__locations_v_b_txtmed_v" CASCADE;
  DROP TABLE "__locations_v_b_cards_v_manual_cards" CASCADE;
  DROP TABLE "__locations_v_b_cards_v_links" CASCADE;
  DROP TABLE "__locations_v_b_cards_v" CASCADE;
  DROP TABLE "__locations_v_b_feats_v_features" CASCADE;
  DROP TABLE "__locations_v_b_feats_v_links" CASCADE;
  DROP TABLE "__locations_v_b_feats_v" CASCADE;
  DROP TABLE "__locations_v_b_gal_v_images" CASCADE;
  DROP TABLE "__locations_v_b_gal_v" CASCADE;
  DROP TABLE "__locations_v_b_tstm_v" CASCADE;
  DROP TABLE "__locations_v_b_faq_v_items" CASCADE;
  DROP TABLE "__locations_v_b_faq_v" CASCADE;
  DROP TABLE "__locations_v_b_cta_v_links" CASCADE;
  DROP TABLE "__locations_v_b_cta_v" CASCADE;
  DROP TABLE "__locations_v_b_form_v" CASCADE;
  DROP TABLE "__locations_v_b_gated_v_bullets" CASCADE;
  DROP TABLE "__locations_v_b_gated_v" CASCADE;
  DROP TABLE "__locations_v_b_dls_v" CASCADE;
  DROP TABLE "__locations_v_b_cont_v_columns" CASCADE;
  DROP TABLE "__locations_v_b_cont_v" CASCADE;
  DROP TABLE "__locations_v_b_med_v" CASCADE;
  DROP TABLE "__locations_v_b_arch_v" CASCADE;
  DROP TABLE "_locations_v" CASCADE;
  DROP TABLE "_locations_v_rels" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "testimonials_rels" CASCADE;
  DROP TABLE "team_qualifications" CASCADE;
  DROP TABLE "team" CASCADE;
  DROP TABLE "team_rels" CASCADE;
  DROP TABLE "downloads" CASCADE;
  DROP TABLE "downloads_rels" CASCADE;
  DROP TABLE "download_requests" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_b_step" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_megamenu_columns_links" CASCADE;
  DROP TABLE "header_nav_items_megamenu_columns" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_ctas" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings_opening_hours_days" CASCADE;
  DROP TABLE "site_settings_opening_hours" CASCADE;
  DROP TABLE "site_settings_accreditations" CASCADE;
  DROP TABLE "site_settings_social_profiles" CASCADE;
  DROP TABLE "site_settings_enquiry_recipients" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_b_hero_links_link_type";
  DROP TYPE "public"."enum_pages_b_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_b_hero_height";
  DROP TYPE "public"."enum_pages_b_hero_background";
  DROP TYPE "public"."enum_pages_b_hero_texture";
  DROP TYPE "public"."enum_pages_b_hero_overlay";
  DROP TYPE "public"."enum_pages_b_hero_align";
  DROP TYPE "public"."enum_pages_b_txtmed_links_link_type";
  DROP TYPE "public"."enum_pages_b_txtmed_links_link_appearance";
  DROP TYPE "public"."enum_pages_b_txtmed_media_position";
  DROP TYPE "public"."enum_pages_b_txtmed_media_ratio";
  DROP TYPE "public"."enum_pages_b_txtmed_media_width";
  DROP TYPE "public"."enum_pages_b_txtmed_heading_level";
  DROP TYPE "public"."enum_pages_b_txtmed_appearance_tone";
  DROP TYPE "public"."enum_pages_b_txtmed_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_cards_manual_cards_link_type";
  DROP TYPE "public"."enum_pages_b_cards_links_link_type";
  DROP TYPE "public"."enum_pages_b_cards_links_link_appearance";
  DROP TYPE "public"."enum_pages_b_cards_heading_level";
  DROP TYPE "public"."enum_pages_b_cards_source";
  DROP TYPE "public"."enum_pages_b_cards_columns";
  DROP TYPE "public"."enum_pages_b_cards_relation_to";
  DROP TYPE "public"."enum_pages_b_cards_card_style";
  DROP TYPE "public"."enum_pages_b_cards_appearance_tone";
  DROP TYPE "public"."enum_pages_b_cards_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_feats_features_icon";
  DROP TYPE "public"."enum_pages_b_feats_links_link_type";
  DROP TYPE "public"."enum_pages_b_feats_links_link_appearance";
  DROP TYPE "public"."enum_pages_b_feats_heading_level";
  DROP TYPE "public"."enum_pages_b_feats_columns";
  DROP TYPE "public"."enum_pages_b_feats_style";
  DROP TYPE "public"."enum_pages_b_feats_appearance_tone";
  DROP TYPE "public"."enum_pages_b_feats_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_gal_heading_level";
  DROP TYPE "public"."enum_pages_b_gal_layout";
  DROP TYPE "public"."enum_pages_b_gal_columns";
  DROP TYPE "public"."enum_pages_b_gal_appearance_tone";
  DROP TYPE "public"."enum_pages_b_gal_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_tstm_heading_level";
  DROP TYPE "public"."enum_pages_b_tstm_source";
  DROP TYPE "public"."enum_pages_b_tstm_layout";
  DROP TYPE "public"."enum_pages_b_tstm_appearance_tone";
  DROP TYPE "public"."enum_pages_b_tstm_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_faq_heading_level";
  DROP TYPE "public"."enum_pages_b_faq_appearance_tone";
  DROP TYPE "public"."enum_pages_b_faq_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_cta_links_link_type";
  DROP TYPE "public"."enum_pages_b_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_b_cta_layout";
  DROP TYPE "public"."enum_pages_b_cta_appearance_tone";
  DROP TYPE "public"."enum_pages_b_cta_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_form_layout";
  DROP TYPE "public"."enum_pages_b_form_width";
  DROP TYPE "public"."enum_pages_b_form_appearance_tone";
  DROP TYPE "public"."enum_pages_b_form_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_gated_heading_level";
  DROP TYPE "public"."enum_pages_b_gated_appearance_tone";
  DROP TYPE "public"."enum_pages_b_gated_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_dls_heading_level";
  DROP TYPE "public"."enum_pages_b_dls_source";
  DROP TYPE "public"."enum_pages_b_dls_layout";
  DROP TYPE "public"."enum_pages_b_dls_appearance_tone";
  DROP TYPE "public"."enum_pages_b_dls_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_cont_columns_size";
  DROP TYPE "public"."enum_pages_b_cont_columns_measure";
  DROP TYPE "public"."enum_pages_b_cont_columns_link_type";
  DROP TYPE "public"."enum_pages_b_cont_columns_link_appearance";
  DROP TYPE "public"."enum_pages_b_cont_appearance_tone";
  DROP TYPE "public"."enum_pages_b_cont_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_med_size";
  DROP TYPE "public"."enum_pages_b_med_appearance_tone";
  DROP TYPE "public"."enum_pages_b_med_appearance_spacing";
  DROP TYPE "public"."enum_pages_b_arch_heading_level";
  DROP TYPE "public"."enum_pages_b_arch_relation_to";
  DROP TYPE "public"."enum_pages_b_arch_appearance_tone";
  DROP TYPE "public"."enum_pages_b_arch_appearance_spacing";
  DROP TYPE "public"."enum_pages_meta_priority";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum___pages_v_b_hero_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_b_hero_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_hero_v_height";
  DROP TYPE "public"."enum___pages_v_b_hero_v_background";
  DROP TYPE "public"."enum___pages_v_b_hero_v_texture";
  DROP TYPE "public"."enum___pages_v_b_hero_v_overlay";
  DROP TYPE "public"."enum___pages_v_b_hero_v_align";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_media_position";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_media_ratio";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_media_width";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_txtmed_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_cards_v_manual_cards_link_type";
  DROP TYPE "public"."enum___pages_v_b_cards_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_b_cards_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_cards_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_cards_v_source";
  DROP TYPE "public"."enum___pages_v_b_cards_v_columns";
  DROP TYPE "public"."enum___pages_v_b_cards_v_relation_to";
  DROP TYPE "public"."enum___pages_v_b_cards_v_card_style";
  DROP TYPE "public"."enum___pages_v_b_cards_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_cards_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_feats_v_features_icon";
  DROP TYPE "public"."enum___pages_v_b_feats_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_b_feats_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_feats_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_feats_v_columns";
  DROP TYPE "public"."enum___pages_v_b_feats_v_style";
  DROP TYPE "public"."enum___pages_v_b_feats_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_feats_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_gal_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_gal_v_layout";
  DROP TYPE "public"."enum___pages_v_b_gal_v_columns";
  DROP TYPE "public"."enum___pages_v_b_gal_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_gal_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_tstm_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_tstm_v_source";
  DROP TYPE "public"."enum___pages_v_b_tstm_v_layout";
  DROP TYPE "public"."enum___pages_v_b_tstm_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_tstm_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_faq_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_faq_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_faq_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_cta_v_links_link_type";
  DROP TYPE "public"."enum___pages_v_b_cta_v_links_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_cta_v_layout";
  DROP TYPE "public"."enum___pages_v_b_cta_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_cta_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_form_v_layout";
  DROP TYPE "public"."enum___pages_v_b_form_v_width";
  DROP TYPE "public"."enum___pages_v_b_form_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_form_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_gated_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_gated_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_gated_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_dls_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_dls_v_source";
  DROP TYPE "public"."enum___pages_v_b_dls_v_layout";
  DROP TYPE "public"."enum___pages_v_b_dls_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_dls_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_cont_v_columns_size";
  DROP TYPE "public"."enum___pages_v_b_cont_v_columns_measure";
  DROP TYPE "public"."enum___pages_v_b_cont_v_columns_link_type";
  DROP TYPE "public"."enum___pages_v_b_cont_v_columns_link_appearance";
  DROP TYPE "public"."enum___pages_v_b_cont_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_cont_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_med_v_size";
  DROP TYPE "public"."enum___pages_v_b_med_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_med_v_appearance_spacing";
  DROP TYPE "public"."enum___pages_v_b_arch_v_heading_level";
  DROP TYPE "public"."enum___pages_v_b_arch_v_relation_to";
  DROP TYPE "public"."enum___pages_v_b_arch_v_appearance_tone";
  DROP TYPE "public"."enum___pages_v_b_arch_v_appearance_spacing";
  DROP TYPE "public"."enum__pages_v_version_meta_priority";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_b_txtmed_links_link_type";
  DROP TYPE "public"."enum_posts_b_txtmed_links_link_appearance";
  DROP TYPE "public"."enum_posts_b_txtmed_media_position";
  DROP TYPE "public"."enum_posts_b_txtmed_media_ratio";
  DROP TYPE "public"."enum_posts_b_txtmed_media_width";
  DROP TYPE "public"."enum_posts_b_txtmed_heading_level";
  DROP TYPE "public"."enum_posts_b_txtmed_appearance_tone";
  DROP TYPE "public"."enum_posts_b_txtmed_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_cards_manual_cards_link_type";
  DROP TYPE "public"."enum_posts_b_cards_links_link_type";
  DROP TYPE "public"."enum_posts_b_cards_links_link_appearance";
  DROP TYPE "public"."enum_posts_b_cards_heading_level";
  DROP TYPE "public"."enum_posts_b_cards_source";
  DROP TYPE "public"."enum_posts_b_cards_columns";
  DROP TYPE "public"."enum_posts_b_cards_relation_to";
  DROP TYPE "public"."enum_posts_b_cards_card_style";
  DROP TYPE "public"."enum_posts_b_cards_appearance_tone";
  DROP TYPE "public"."enum_posts_b_cards_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_feats_features_icon";
  DROP TYPE "public"."enum_posts_b_feats_links_link_type";
  DROP TYPE "public"."enum_posts_b_feats_links_link_appearance";
  DROP TYPE "public"."enum_posts_b_feats_heading_level";
  DROP TYPE "public"."enum_posts_b_feats_columns";
  DROP TYPE "public"."enum_posts_b_feats_style";
  DROP TYPE "public"."enum_posts_b_feats_appearance_tone";
  DROP TYPE "public"."enum_posts_b_feats_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_gal_heading_level";
  DROP TYPE "public"."enum_posts_b_gal_layout";
  DROP TYPE "public"."enum_posts_b_gal_columns";
  DROP TYPE "public"."enum_posts_b_gal_appearance_tone";
  DROP TYPE "public"."enum_posts_b_gal_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_tstm_heading_level";
  DROP TYPE "public"."enum_posts_b_tstm_source";
  DROP TYPE "public"."enum_posts_b_tstm_layout";
  DROP TYPE "public"."enum_posts_b_tstm_appearance_tone";
  DROP TYPE "public"."enum_posts_b_tstm_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_faq_heading_level";
  DROP TYPE "public"."enum_posts_b_faq_appearance_tone";
  DROP TYPE "public"."enum_posts_b_faq_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_cta_links_link_type";
  DROP TYPE "public"."enum_posts_b_cta_links_link_appearance";
  DROP TYPE "public"."enum_posts_b_cta_layout";
  DROP TYPE "public"."enum_posts_b_cta_appearance_tone";
  DROP TYPE "public"."enum_posts_b_cta_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_form_layout";
  DROP TYPE "public"."enum_posts_b_form_width";
  DROP TYPE "public"."enum_posts_b_form_appearance_tone";
  DROP TYPE "public"."enum_posts_b_form_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_gated_heading_level";
  DROP TYPE "public"."enum_posts_b_gated_appearance_tone";
  DROP TYPE "public"."enum_posts_b_gated_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_dls_heading_level";
  DROP TYPE "public"."enum_posts_b_dls_source";
  DROP TYPE "public"."enum_posts_b_dls_layout";
  DROP TYPE "public"."enum_posts_b_dls_appearance_tone";
  DROP TYPE "public"."enum_posts_b_dls_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_cont_columns_size";
  DROP TYPE "public"."enum_posts_b_cont_columns_measure";
  DROP TYPE "public"."enum_posts_b_cont_columns_link_type";
  DROP TYPE "public"."enum_posts_b_cont_columns_link_appearance";
  DROP TYPE "public"."enum_posts_b_cont_appearance_tone";
  DROP TYPE "public"."enum_posts_b_cont_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_med_size";
  DROP TYPE "public"."enum_posts_b_med_appearance_tone";
  DROP TYPE "public"."enum_posts_b_med_appearance_spacing";
  DROP TYPE "public"."enum_posts_b_arch_heading_level";
  DROP TYPE "public"."enum_posts_b_arch_relation_to";
  DROP TYPE "public"."enum_posts_b_arch_appearance_tone";
  DROP TYPE "public"."enum_posts_b_arch_appearance_spacing";
  DROP TYPE "public"."enum_posts_meta_priority";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_links_link_type";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_links_link_appearance";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_media_position";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_media_ratio";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_media_width";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_txtmed_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_cards_v_manual_cards_link_type";
  DROP TYPE "public"."enum___posts_v_b_cards_v_links_link_type";
  DROP TYPE "public"."enum___posts_v_b_cards_v_links_link_appearance";
  DROP TYPE "public"."enum___posts_v_b_cards_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_cards_v_source";
  DROP TYPE "public"."enum___posts_v_b_cards_v_columns";
  DROP TYPE "public"."enum___posts_v_b_cards_v_relation_to";
  DROP TYPE "public"."enum___posts_v_b_cards_v_card_style";
  DROP TYPE "public"."enum___posts_v_b_cards_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_cards_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_feats_v_features_icon";
  DROP TYPE "public"."enum___posts_v_b_feats_v_links_link_type";
  DROP TYPE "public"."enum___posts_v_b_feats_v_links_link_appearance";
  DROP TYPE "public"."enum___posts_v_b_feats_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_feats_v_columns";
  DROP TYPE "public"."enum___posts_v_b_feats_v_style";
  DROP TYPE "public"."enum___posts_v_b_feats_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_feats_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_gal_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_gal_v_layout";
  DROP TYPE "public"."enum___posts_v_b_gal_v_columns";
  DROP TYPE "public"."enum___posts_v_b_gal_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_gal_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_tstm_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_tstm_v_source";
  DROP TYPE "public"."enum___posts_v_b_tstm_v_layout";
  DROP TYPE "public"."enum___posts_v_b_tstm_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_tstm_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_faq_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_faq_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_faq_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_cta_v_links_link_type";
  DROP TYPE "public"."enum___posts_v_b_cta_v_links_link_appearance";
  DROP TYPE "public"."enum___posts_v_b_cta_v_layout";
  DROP TYPE "public"."enum___posts_v_b_cta_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_cta_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_form_v_layout";
  DROP TYPE "public"."enum___posts_v_b_form_v_width";
  DROP TYPE "public"."enum___posts_v_b_form_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_form_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_gated_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_gated_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_gated_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_dls_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_dls_v_source";
  DROP TYPE "public"."enum___posts_v_b_dls_v_layout";
  DROP TYPE "public"."enum___posts_v_b_dls_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_dls_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_cont_v_columns_size";
  DROP TYPE "public"."enum___posts_v_b_cont_v_columns_measure";
  DROP TYPE "public"."enum___posts_v_b_cont_v_columns_link_type";
  DROP TYPE "public"."enum___posts_v_b_cont_v_columns_link_appearance";
  DROP TYPE "public"."enum___posts_v_b_cont_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_cont_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_med_v_size";
  DROP TYPE "public"."enum___posts_v_b_med_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_med_v_appearance_spacing";
  DROP TYPE "public"."enum___posts_v_b_arch_v_heading_level";
  DROP TYPE "public"."enum___posts_v_b_arch_v_relation_to";
  DROP TYPE "public"."enum___posts_v_b_arch_v_appearance_tone";
  DROP TYPE "public"."enum___posts_v_b_arch_v_appearance_spacing";
  DROP TYPE "public"."enum__posts_v_version_meta_priority";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_services_b_txtmed_links_link_type";
  DROP TYPE "public"."enum_services_b_txtmed_links_link_appearance";
  DROP TYPE "public"."enum_services_b_txtmed_media_position";
  DROP TYPE "public"."enum_services_b_txtmed_media_ratio";
  DROP TYPE "public"."enum_services_b_txtmed_media_width";
  DROP TYPE "public"."enum_services_b_txtmed_heading_level";
  DROP TYPE "public"."enum_services_b_txtmed_appearance_tone";
  DROP TYPE "public"."enum_services_b_txtmed_appearance_spacing";
  DROP TYPE "public"."enum_services_b_cards_manual_cards_link_type";
  DROP TYPE "public"."enum_services_b_cards_links_link_type";
  DROP TYPE "public"."enum_services_b_cards_links_link_appearance";
  DROP TYPE "public"."enum_services_b_cards_heading_level";
  DROP TYPE "public"."enum_services_b_cards_source";
  DROP TYPE "public"."enum_services_b_cards_columns";
  DROP TYPE "public"."enum_services_b_cards_relation_to";
  DROP TYPE "public"."enum_services_b_cards_card_style";
  DROP TYPE "public"."enum_services_b_cards_appearance_tone";
  DROP TYPE "public"."enum_services_b_cards_appearance_spacing";
  DROP TYPE "public"."enum_services_b_feats_features_icon";
  DROP TYPE "public"."enum_services_b_feats_links_link_type";
  DROP TYPE "public"."enum_services_b_feats_links_link_appearance";
  DROP TYPE "public"."enum_services_b_feats_heading_level";
  DROP TYPE "public"."enum_services_b_feats_columns";
  DROP TYPE "public"."enum_services_b_feats_style";
  DROP TYPE "public"."enum_services_b_feats_appearance_tone";
  DROP TYPE "public"."enum_services_b_feats_appearance_spacing";
  DROP TYPE "public"."enum_services_b_gal_heading_level";
  DROP TYPE "public"."enum_services_b_gal_layout";
  DROP TYPE "public"."enum_services_b_gal_columns";
  DROP TYPE "public"."enum_services_b_gal_appearance_tone";
  DROP TYPE "public"."enum_services_b_gal_appearance_spacing";
  DROP TYPE "public"."enum_services_b_tstm_heading_level";
  DROP TYPE "public"."enum_services_b_tstm_source";
  DROP TYPE "public"."enum_services_b_tstm_layout";
  DROP TYPE "public"."enum_services_b_tstm_appearance_tone";
  DROP TYPE "public"."enum_services_b_tstm_appearance_spacing";
  DROP TYPE "public"."enum_services_b_faq_heading_level";
  DROP TYPE "public"."enum_services_b_faq_appearance_tone";
  DROP TYPE "public"."enum_services_b_faq_appearance_spacing";
  DROP TYPE "public"."enum_services_b_cta_links_link_type";
  DROP TYPE "public"."enum_services_b_cta_links_link_appearance";
  DROP TYPE "public"."enum_services_b_cta_layout";
  DROP TYPE "public"."enum_services_b_cta_appearance_tone";
  DROP TYPE "public"."enum_services_b_cta_appearance_spacing";
  DROP TYPE "public"."enum_services_b_form_layout";
  DROP TYPE "public"."enum_services_b_form_width";
  DROP TYPE "public"."enum_services_b_form_appearance_tone";
  DROP TYPE "public"."enum_services_b_form_appearance_spacing";
  DROP TYPE "public"."enum_services_b_gated_heading_level";
  DROP TYPE "public"."enum_services_b_gated_appearance_tone";
  DROP TYPE "public"."enum_services_b_gated_appearance_spacing";
  DROP TYPE "public"."enum_services_b_dls_heading_level";
  DROP TYPE "public"."enum_services_b_dls_source";
  DROP TYPE "public"."enum_services_b_dls_layout";
  DROP TYPE "public"."enum_services_b_dls_appearance_tone";
  DROP TYPE "public"."enum_services_b_dls_appearance_spacing";
  DROP TYPE "public"."enum_services_b_cont_columns_size";
  DROP TYPE "public"."enum_services_b_cont_columns_measure";
  DROP TYPE "public"."enum_services_b_cont_columns_link_type";
  DROP TYPE "public"."enum_services_b_cont_columns_link_appearance";
  DROP TYPE "public"."enum_services_b_cont_appearance_tone";
  DROP TYPE "public"."enum_services_b_cont_appearance_spacing";
  DROP TYPE "public"."enum_services_b_med_size";
  DROP TYPE "public"."enum_services_b_med_appearance_tone";
  DROP TYPE "public"."enum_services_b_med_appearance_spacing";
  DROP TYPE "public"."enum_services_b_arch_heading_level";
  DROP TYPE "public"."enum_services_b_arch_relation_to";
  DROP TYPE "public"."enum_services_b_arch_appearance_tone";
  DROP TYPE "public"."enum_services_b_arch_appearance_spacing";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_meta_priority";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_links_link_type";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_links_link_appearance";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_media_position";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_media_ratio";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_media_width";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_txtmed_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_cards_v_manual_cards_link_type";
  DROP TYPE "public"."enum___services_v_b_cards_v_links_link_type";
  DROP TYPE "public"."enum___services_v_b_cards_v_links_link_appearance";
  DROP TYPE "public"."enum___services_v_b_cards_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_cards_v_source";
  DROP TYPE "public"."enum___services_v_b_cards_v_columns";
  DROP TYPE "public"."enum___services_v_b_cards_v_relation_to";
  DROP TYPE "public"."enum___services_v_b_cards_v_card_style";
  DROP TYPE "public"."enum___services_v_b_cards_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_cards_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_feats_v_features_icon";
  DROP TYPE "public"."enum___services_v_b_feats_v_links_link_type";
  DROP TYPE "public"."enum___services_v_b_feats_v_links_link_appearance";
  DROP TYPE "public"."enum___services_v_b_feats_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_feats_v_columns";
  DROP TYPE "public"."enum___services_v_b_feats_v_style";
  DROP TYPE "public"."enum___services_v_b_feats_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_feats_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_gal_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_gal_v_layout";
  DROP TYPE "public"."enum___services_v_b_gal_v_columns";
  DROP TYPE "public"."enum___services_v_b_gal_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_gal_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_tstm_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_tstm_v_source";
  DROP TYPE "public"."enum___services_v_b_tstm_v_layout";
  DROP TYPE "public"."enum___services_v_b_tstm_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_tstm_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_faq_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_faq_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_faq_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_cta_v_links_link_type";
  DROP TYPE "public"."enum___services_v_b_cta_v_links_link_appearance";
  DROP TYPE "public"."enum___services_v_b_cta_v_layout";
  DROP TYPE "public"."enum___services_v_b_cta_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_cta_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_form_v_layout";
  DROP TYPE "public"."enum___services_v_b_form_v_width";
  DROP TYPE "public"."enum___services_v_b_form_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_form_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_gated_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_gated_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_gated_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_dls_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_dls_v_source";
  DROP TYPE "public"."enum___services_v_b_dls_v_layout";
  DROP TYPE "public"."enum___services_v_b_dls_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_dls_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_cont_v_columns_size";
  DROP TYPE "public"."enum___services_v_b_cont_v_columns_measure";
  DROP TYPE "public"."enum___services_v_b_cont_v_columns_link_type";
  DROP TYPE "public"."enum___services_v_b_cont_v_columns_link_appearance";
  DROP TYPE "public"."enum___services_v_b_cont_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_cont_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_med_v_size";
  DROP TYPE "public"."enum___services_v_b_med_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_med_v_appearance_spacing";
  DROP TYPE "public"."enum___services_v_b_arch_v_heading_level";
  DROP TYPE "public"."enum___services_v_b_arch_v_relation_to";
  DROP TYPE "public"."enum___services_v_b_arch_v_appearance_tone";
  DROP TYPE "public"."enum___services_v_b_arch_v_appearance_spacing";
  DROP TYPE "public"."enum__services_v_version_icon";
  DROP TYPE "public"."enum__services_v_version_meta_priority";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_case_studies_b_txtmed_links_link_type";
  DROP TYPE "public"."enum_case_studies_b_txtmed_links_link_appearance";
  DROP TYPE "public"."enum_case_studies_b_txtmed_media_position";
  DROP TYPE "public"."enum_case_studies_b_txtmed_media_ratio";
  DROP TYPE "public"."enum_case_studies_b_txtmed_media_width";
  DROP TYPE "public"."enum_case_studies_b_txtmed_heading_level";
  DROP TYPE "public"."enum_case_studies_b_txtmed_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_txtmed_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_cards_manual_cards_link_type";
  DROP TYPE "public"."enum_case_studies_b_cards_links_link_type";
  DROP TYPE "public"."enum_case_studies_b_cards_links_link_appearance";
  DROP TYPE "public"."enum_case_studies_b_cards_heading_level";
  DROP TYPE "public"."enum_case_studies_b_cards_source";
  DROP TYPE "public"."enum_case_studies_b_cards_columns";
  DROP TYPE "public"."enum_case_studies_b_cards_relation_to";
  DROP TYPE "public"."enum_case_studies_b_cards_card_style";
  DROP TYPE "public"."enum_case_studies_b_cards_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_cards_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_feats_features_icon";
  DROP TYPE "public"."enum_case_studies_b_feats_links_link_type";
  DROP TYPE "public"."enum_case_studies_b_feats_links_link_appearance";
  DROP TYPE "public"."enum_case_studies_b_feats_heading_level";
  DROP TYPE "public"."enum_case_studies_b_feats_columns";
  DROP TYPE "public"."enum_case_studies_b_feats_style";
  DROP TYPE "public"."enum_case_studies_b_feats_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_feats_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_gal_heading_level";
  DROP TYPE "public"."enum_case_studies_b_gal_layout";
  DROP TYPE "public"."enum_case_studies_b_gal_columns";
  DROP TYPE "public"."enum_case_studies_b_gal_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_gal_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_tstm_heading_level";
  DROP TYPE "public"."enum_case_studies_b_tstm_source";
  DROP TYPE "public"."enum_case_studies_b_tstm_layout";
  DROP TYPE "public"."enum_case_studies_b_tstm_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_tstm_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_faq_heading_level";
  DROP TYPE "public"."enum_case_studies_b_faq_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_faq_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_cta_links_link_type";
  DROP TYPE "public"."enum_case_studies_b_cta_links_link_appearance";
  DROP TYPE "public"."enum_case_studies_b_cta_layout";
  DROP TYPE "public"."enum_case_studies_b_cta_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_cta_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_form_layout";
  DROP TYPE "public"."enum_case_studies_b_form_width";
  DROP TYPE "public"."enum_case_studies_b_form_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_form_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_gated_heading_level";
  DROP TYPE "public"."enum_case_studies_b_gated_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_gated_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_dls_heading_level";
  DROP TYPE "public"."enum_case_studies_b_dls_source";
  DROP TYPE "public"."enum_case_studies_b_dls_layout";
  DROP TYPE "public"."enum_case_studies_b_dls_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_dls_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_cont_columns_size";
  DROP TYPE "public"."enum_case_studies_b_cont_columns_measure";
  DROP TYPE "public"."enum_case_studies_b_cont_columns_link_type";
  DROP TYPE "public"."enum_case_studies_b_cont_columns_link_appearance";
  DROP TYPE "public"."enum_case_studies_b_cont_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_cont_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_med_size";
  DROP TYPE "public"."enum_case_studies_b_med_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_med_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_b_arch_heading_level";
  DROP TYPE "public"."enum_case_studies_b_arch_relation_to";
  DROP TYPE "public"."enum_case_studies_b_arch_appearance_tone";
  DROP TYPE "public"."enum_case_studies_b_arch_appearance_spacing";
  DROP TYPE "public"."enum_case_studies_meta_priority";
  DROP TYPE "public"."enum_case_studies_status";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_links_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_links_link_appearance";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_media_position";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_media_ratio";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_media_width";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_txtmed_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_manual_cards_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_links_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_links_link_appearance";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_source";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_columns";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_relation_to";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_card_style";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_cards_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_features_icon";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_links_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_links_link_appearance";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_columns";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_style";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_feats_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_gal_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_gal_v_layout";
  DROP TYPE "public"."enum___case_studies_v_b_gal_v_columns";
  DROP TYPE "public"."enum___case_studies_v_b_gal_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_gal_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_tstm_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_tstm_v_source";
  DROP TYPE "public"."enum___case_studies_v_b_tstm_v_layout";
  DROP TYPE "public"."enum___case_studies_v_b_tstm_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_tstm_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_faq_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_faq_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_faq_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_cta_v_links_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_cta_v_links_link_appearance";
  DROP TYPE "public"."enum___case_studies_v_b_cta_v_layout";
  DROP TYPE "public"."enum___case_studies_v_b_cta_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_cta_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_form_v_layout";
  DROP TYPE "public"."enum___case_studies_v_b_form_v_width";
  DROP TYPE "public"."enum___case_studies_v_b_form_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_form_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_gated_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_gated_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_gated_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_dls_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_dls_v_source";
  DROP TYPE "public"."enum___case_studies_v_b_dls_v_layout";
  DROP TYPE "public"."enum___case_studies_v_b_dls_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_dls_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_columns_size";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_columns_measure";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_columns_link_type";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_columns_link_appearance";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_cont_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_med_v_size";
  DROP TYPE "public"."enum___case_studies_v_b_med_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_med_v_appearance_spacing";
  DROP TYPE "public"."enum___case_studies_v_b_arch_v_heading_level";
  DROP TYPE "public"."enum___case_studies_v_b_arch_v_relation_to";
  DROP TYPE "public"."enum___case_studies_v_b_arch_v_appearance_tone";
  DROP TYPE "public"."enum___case_studies_v_b_arch_v_appearance_spacing";
  DROP TYPE "public"."enum__case_studies_v_version_meta_priority";
  DROP TYPE "public"."enum__case_studies_v_version_status";
  DROP TYPE "public"."enum_locations_b_txtmed_links_link_type";
  DROP TYPE "public"."enum_locations_b_txtmed_links_link_appearance";
  DROP TYPE "public"."enum_locations_b_txtmed_media_position";
  DROP TYPE "public"."enum_locations_b_txtmed_media_ratio";
  DROP TYPE "public"."enum_locations_b_txtmed_media_width";
  DROP TYPE "public"."enum_locations_b_txtmed_heading_level";
  DROP TYPE "public"."enum_locations_b_txtmed_appearance_tone";
  DROP TYPE "public"."enum_locations_b_txtmed_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_cards_manual_cards_link_type";
  DROP TYPE "public"."enum_locations_b_cards_links_link_type";
  DROP TYPE "public"."enum_locations_b_cards_links_link_appearance";
  DROP TYPE "public"."enum_locations_b_cards_heading_level";
  DROP TYPE "public"."enum_locations_b_cards_source";
  DROP TYPE "public"."enum_locations_b_cards_columns";
  DROP TYPE "public"."enum_locations_b_cards_relation_to";
  DROP TYPE "public"."enum_locations_b_cards_card_style";
  DROP TYPE "public"."enum_locations_b_cards_appearance_tone";
  DROP TYPE "public"."enum_locations_b_cards_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_feats_features_icon";
  DROP TYPE "public"."enum_locations_b_feats_links_link_type";
  DROP TYPE "public"."enum_locations_b_feats_links_link_appearance";
  DROP TYPE "public"."enum_locations_b_feats_heading_level";
  DROP TYPE "public"."enum_locations_b_feats_columns";
  DROP TYPE "public"."enum_locations_b_feats_style";
  DROP TYPE "public"."enum_locations_b_feats_appearance_tone";
  DROP TYPE "public"."enum_locations_b_feats_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_gal_heading_level";
  DROP TYPE "public"."enum_locations_b_gal_layout";
  DROP TYPE "public"."enum_locations_b_gal_columns";
  DROP TYPE "public"."enum_locations_b_gal_appearance_tone";
  DROP TYPE "public"."enum_locations_b_gal_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_tstm_heading_level";
  DROP TYPE "public"."enum_locations_b_tstm_source";
  DROP TYPE "public"."enum_locations_b_tstm_layout";
  DROP TYPE "public"."enum_locations_b_tstm_appearance_tone";
  DROP TYPE "public"."enum_locations_b_tstm_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_faq_heading_level";
  DROP TYPE "public"."enum_locations_b_faq_appearance_tone";
  DROP TYPE "public"."enum_locations_b_faq_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_cta_links_link_type";
  DROP TYPE "public"."enum_locations_b_cta_links_link_appearance";
  DROP TYPE "public"."enum_locations_b_cta_layout";
  DROP TYPE "public"."enum_locations_b_cta_appearance_tone";
  DROP TYPE "public"."enum_locations_b_cta_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_form_layout";
  DROP TYPE "public"."enum_locations_b_form_width";
  DROP TYPE "public"."enum_locations_b_form_appearance_tone";
  DROP TYPE "public"."enum_locations_b_form_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_gated_heading_level";
  DROP TYPE "public"."enum_locations_b_gated_appearance_tone";
  DROP TYPE "public"."enum_locations_b_gated_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_dls_heading_level";
  DROP TYPE "public"."enum_locations_b_dls_source";
  DROP TYPE "public"."enum_locations_b_dls_layout";
  DROP TYPE "public"."enum_locations_b_dls_appearance_tone";
  DROP TYPE "public"."enum_locations_b_dls_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_cont_columns_size";
  DROP TYPE "public"."enum_locations_b_cont_columns_measure";
  DROP TYPE "public"."enum_locations_b_cont_columns_link_type";
  DROP TYPE "public"."enum_locations_b_cont_columns_link_appearance";
  DROP TYPE "public"."enum_locations_b_cont_appearance_tone";
  DROP TYPE "public"."enum_locations_b_cont_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_med_size";
  DROP TYPE "public"."enum_locations_b_med_appearance_tone";
  DROP TYPE "public"."enum_locations_b_med_appearance_spacing";
  DROP TYPE "public"."enum_locations_b_arch_heading_level";
  DROP TYPE "public"."enum_locations_b_arch_relation_to";
  DROP TYPE "public"."enum_locations_b_arch_appearance_tone";
  DROP TYPE "public"."enum_locations_b_arch_appearance_spacing";
  DROP TYPE "public"."enum_locations_meta_priority";
  DROP TYPE "public"."enum_locations_status";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_links_link_type";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_links_link_appearance";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_media_position";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_media_ratio";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_media_width";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_txtmed_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_cards_v_manual_cards_link_type";
  DROP TYPE "public"."enum___locations_v_b_cards_v_links_link_type";
  DROP TYPE "public"."enum___locations_v_b_cards_v_links_link_appearance";
  DROP TYPE "public"."enum___locations_v_b_cards_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_cards_v_source";
  DROP TYPE "public"."enum___locations_v_b_cards_v_columns";
  DROP TYPE "public"."enum___locations_v_b_cards_v_relation_to";
  DROP TYPE "public"."enum___locations_v_b_cards_v_card_style";
  DROP TYPE "public"."enum___locations_v_b_cards_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_cards_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_feats_v_features_icon";
  DROP TYPE "public"."enum___locations_v_b_feats_v_links_link_type";
  DROP TYPE "public"."enum___locations_v_b_feats_v_links_link_appearance";
  DROP TYPE "public"."enum___locations_v_b_feats_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_feats_v_columns";
  DROP TYPE "public"."enum___locations_v_b_feats_v_style";
  DROP TYPE "public"."enum___locations_v_b_feats_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_feats_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_gal_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_gal_v_layout";
  DROP TYPE "public"."enum___locations_v_b_gal_v_columns";
  DROP TYPE "public"."enum___locations_v_b_gal_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_gal_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_tstm_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_tstm_v_source";
  DROP TYPE "public"."enum___locations_v_b_tstm_v_layout";
  DROP TYPE "public"."enum___locations_v_b_tstm_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_tstm_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_faq_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_faq_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_faq_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_cta_v_links_link_type";
  DROP TYPE "public"."enum___locations_v_b_cta_v_links_link_appearance";
  DROP TYPE "public"."enum___locations_v_b_cta_v_layout";
  DROP TYPE "public"."enum___locations_v_b_cta_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_cta_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_form_v_layout";
  DROP TYPE "public"."enum___locations_v_b_form_v_width";
  DROP TYPE "public"."enum___locations_v_b_form_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_form_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_gated_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_gated_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_gated_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_dls_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_dls_v_source";
  DROP TYPE "public"."enum___locations_v_b_dls_v_layout";
  DROP TYPE "public"."enum___locations_v_b_dls_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_dls_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_cont_v_columns_size";
  DROP TYPE "public"."enum___locations_v_b_cont_v_columns_measure";
  DROP TYPE "public"."enum___locations_v_b_cont_v_columns_link_type";
  DROP TYPE "public"."enum___locations_v_b_cont_v_columns_link_appearance";
  DROP TYPE "public"."enum___locations_v_b_cont_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_cont_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_med_v_size";
  DROP TYPE "public"."enum___locations_v_b_med_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_med_v_appearance_spacing";
  DROP TYPE "public"."enum___locations_v_b_arch_v_heading_level";
  DROP TYPE "public"."enum___locations_v_b_arch_v_relation_to";
  DROP TYPE "public"."enum___locations_v_b_arch_v_appearance_tone";
  DROP TYPE "public"."enum___locations_v_b_arch_v_appearance_spacing";
  DROP TYPE "public"."enum__locations_v_version_meta_priority";
  DROP TYPE "public"."enum__locations_v_version_status";
  DROP TYPE "public"."enum_testimonials_source";
  DROP TYPE "public"."enum_team_meta_priority";
  DROP TYPE "public"."enum_downloads_meta_priority";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_header_nav_items_megamenu_columns_links_link_type";
  DROP TYPE "public"."enum_header_nav_items_megamenu_columns_source";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_megamenu_featured_link_type";
  DROP TYPE "public"."enum_header_ctas_link_type";
  DROP TYPE "public"."enum_header_ctas_link_appearance";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_links_link_type";
  DROP TYPE "public"."enum_site_settings_opening_hours_days";
  DROP TYPE "public"."enum_site_settings_social_profiles_platform";
  DROP TYPE "public"."enum_site_settings_price_range";`)
}
