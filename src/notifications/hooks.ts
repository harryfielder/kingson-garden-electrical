import type { CollectionAfterChangeHook } from 'payload'

import { deliver } from './deliver'
import type { NotifiableCollection } from './messages'

/**
 * Emails the enquiry recipients as soon as a submission is saved.
 *
 * Runs inline rather than queued so the common case needs no cron at all;
 * the cron only picks up what this attempt couldn't send.
 */
export const notifyOnCreate: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
  req,
}) => {
  if (operation !== 'create' || req.context.skipNotification) return doc

  await deliver({
    collection: collection.slug as NotifiableCollection,
    id: doc.id,
    payload: req.payload,
    req,
  })

  return doc
}
