import React from 'react';
import { View, Text } from 'react-native';

import { useTranslation } from '@/hooks';
import { Colors, actuatedNormalize } from '@/themes';
import { TouchableX } from '@/components';
import { Routes } from '@/common'

import styles from './styles';
import { NavigationService } from '@/services';

export const Note = ({ coinId, containerStyle = {} }) => {
  const { t } = useTranslation();
  const renderVndtNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_2')}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderBTCNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderETHNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderXRPNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_2')
                .replace(/#LIMIT/g, 20)
                .replace(/#COIN_ID/g, 'XRP')
                .replace(/#COIN_NAME/g, 'Ripple')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderXLMNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_2')
                .replace(/#LIMIT/g, 3)
                .replace(/#COIN_ID/g, 'XLM')
                .replace(/#COIN_NAME/g, 'Stellar Lumen')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderUSDTNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 2)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTRXNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderUSDFNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderXENGNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 20)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCENTNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 5)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderMATICNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            {/* <Text style={[styles.noteMessage, { color: Colors.WHITE }]}>{t('dots')}</Text> */}
            <Text style={styles.noteMessage}>
              {t('note_1').replace(/#LIMIT/g, 5)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  switch (coinId) {
    case 'vndt':
      return renderVndtNote();
    case 'btc':
      return renderBTCNote();
    case 'eth':
      return renderETHNote();
    case 'xrp':
      return renderXRPNote();
    case 'xlm':
      return renderXLMNote();
    case 'usdt':
      return renderUSDTNote();
    case 'trx':
      return renderTRXNote();
    case 'ufx':
      return renderUSDFNote();
    case 'xeng':
      return renderXENGNote();
    case 'cent':
      return renderCENTNote();
    case 'matic':
      return renderMATICNote();
    default:
      return null;
  }
};

export const SellCoin = ({ coinId, coinName, containerStyle = {} }) => {
  const { t } = useTranslation();

  const onShowAgent = () => {
    NavigationService.navigate(Routes.DEPOSIT_VNDT);
  }

  const renderSellCoin = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />

        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>
              {t('sell_coin').replace(/#COIN_NAME/g, coinName)}
            </Text>
          </View>
          <TouchableX style={{ alignItems: 'center', marginTop: actuatedNormalize(10) }} onPress={onShowAgent}>
            <Text style={[styles.noteMessage, { color: Colors.BLUE, textDecorationLine: 'underline', fontSize: actuatedNormalize(16) }]}>{t('agent').replace(/#COIN_NAME/g, coinName)}</Text>
          </TouchableX>
        </View>
      </View>
    )
  };

  switch (coinId) {
    case 'vndt':
      return renderSellCoin();
    case 'btc':
      return renderSellCoin();
    case 'eth':
      return renderSellCoin();
    case 'xrp':
      return renderSellCoin();
    case 'xlm':
      return renderSellCoin();
    case 'usdt':
      return renderSellCoin();
    case 'trx':
      return renderSellCoin();
    case 'ufx':
      return renderSellCoin();
    case 'xeng':
      return renderSellCoin();
    case 'cent':
      return renderSellCoin();
    case 'matic':
      return renderSellCoin();
    default:
      return null;
  }

}


export const NoteTransfer = ({ coinId, coinName, containerStyle = {} }) => {
  const { t } = useTranslation();

  const renderNoteTransfer = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>Chú ý:</Text>
          </View>
          <TouchableX >
            <Text style={[styles.noteMessage, { color: Colors.ORANGE, fontSize: actuatedNormalize(16) }]}>{t('learn_more').replace(/#COIN_NAME/, coinName)}</Text>
          </TouchableX>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 5)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_2')}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderNote_VNDT = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>Chú ý:</Text>
          </View>
          <TouchableX >
            <Text style={[styles.noteMessage, { color: Colors.ORANGE, fontSize: actuatedNormalize(16) }]}>{t('learn_more').replace(/#COIN_NAME/, coinName)}</Text>
          </TouchableX>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>• Vui lòng kiểm tra kỹ tài khoản ngân hàng và nội dung chuyển tiền, chúng tôi không chịu trách nhiệm với những sai xót đến từ phía khách hàng</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>• VNDT sẽ hiển thị trên Ví của bạn sau từ 5-10p kể từ khi chúng tôi nhận được khoản tiền gửi. Vui lòng kiên nhẫn và liên hệ với hỗ trợ trực tuyến của chúng tôi nếu bạn gặp rắc rối trong quá trình Nạp và Rút tiền.</Text>
          </View>
        </View>
      </View> 
    );
  };

  switch (coinId) {
    case 'vndt':
      return renderNote_VNDT();
    case 'btc':
      return renderNoteTransfer();
    case 'eth':
      return renderNoteTransfer();
    case 'xrp':
      return renderNoteTransfer();
    case 'xlm':
      return renderNoteTransfer();
    case 'usdt':
      return renderNoteTransfer();
    case 'trx':
      return renderNoteTransfer();
    case 'ufx':
      return renderNoteTransfer();
    case 'xeng':
      return renderNoteTransfer();
    case 'cent':
      return renderNoteTransfer();
    default:
      return null;
  }

}

export const NoteDeposit = ({ coinId, coinName, containerStyle = {}, onPress }) => {
  const { t } = useTranslation();
  const renderBTCNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 2)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_2')}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderETHNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 20)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_2')}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderXRPNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 20)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_3')
              .replace(/#NAME/g, coinName)
              .replace(/#LIMIT/g, 20)}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderXLMNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 20)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_3')
              .replace(/#NAME/g, coinName)
              .replace(/#LIMIT/g, 3)}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderUSDTNote = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteTitle}>{t('note')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_1').replace(/#LIMIT/g, 20)}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_2')}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.noteMessage}>{t('vndt_note_4')}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSellCoin = () => {
    return (
      <View style={[styles.noteContainer, containerStyle]}>
        <View style={styles.leftContainer} />
        <View style={styles.noteContainerView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.noteMessage, { textAlign: 'center' }]}>
              {t('note_desposit').replace(/#NAME/g, coinName)}
            </Text>
          </View>
          <TouchableX style={{ alignItems: 'center', marginTop: actuatedNormalize(10) }} onPress={onPress}>
            <Text style={[styles.noteMessage, { color: Colors.BLUE, textDecorationLine: 'underline', fontSize: actuatedNormalize(16) }]}>{t('agent_sell').replace(/#NAME/g, coinName)}</Text>
          </TouchableX>
        </View>
      </View>
    )
  };


  switch (coinId) {
    case 'btc':
      return renderBTCNote();
    case 'trx':
      return renderBTCNote();
    case 'eth':
      return renderETHNote();
    case 'matic':
      return renderETHNote();
    case 'xrp':
      return renderXRPNote();
    case 'xlm':
      return renderXLMNote();
    case 'usdt':
      return renderUSDTNote();
    case 'cent':
      return renderSellCoin();
    case 'ufx':
      return renderSellCoin();
    case 'vndt':
      return renderSellCoin();
    case 'xeng':
      return renderSellCoin();
    default:
      return null
  }
}