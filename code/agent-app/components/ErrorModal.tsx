import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Modal,
  Heading,
  Button
} from 'native-base'


export default function ErrorModal({
  open,
  onClose,
  errorMessage,
}: {
    open: boolean,
    onClose: () => void,
    errorMessage: string
}): JSX.Element {
  return (
    <Modal size={'full'} isOpen={open} style={styles.mainModal}>
      <Modal.Content maxWidth={"400px"}>
        <Modal.Body style={styles.modalBody}>
          <Heading allowFontScaling={false} style={styles.modalHeader}>An error occured!</Heading>
          <Heading allowFontScaling={false} size='sm' style={styles.modalSubheader}>{errorMessage}</Heading>
          <Button
            style={styles.button}
            backgroundColor={'#FF7800'}
            _text={{
              allowFontScaling: false
            }}
            _pressed={{
              borderColor: 'black'
            }}
            onPress={() => {
              onClose()
            }}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainModal: {
  },
  modalBody: {
    flex: 1,
    alignItems: 'center'
  },
  modalHeader: {
    fontSize: 30,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 10,
    color: '#FF7800'
  },
  modalSubheader: {
    fontSize: 15,
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    margin: 10,
    width: 125,
    borderRadius: 25,
  },
  notesContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  notes: {
    fontFamily: 'Roboto-Light',
    fontSize: 17
  },
  mainBox: {
    height: '80%'
  }
});