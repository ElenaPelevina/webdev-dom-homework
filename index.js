'use strict'

import { addComment } from './modules/eventListeners.js'
import { getComment } from './modules/api.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите. Загружаю комментарии...'

getComment()
addComment()
