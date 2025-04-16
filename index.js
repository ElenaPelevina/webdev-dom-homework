'use strict'

import { getComment } from './modules/api.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста, подождите. Загружаю комментарии...'

getComment()
