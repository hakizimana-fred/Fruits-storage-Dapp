import { useEffect, useState } from 'react'
import { 
  Container,
  Form,
  Button,
  Table
} from 'react-bootstrap'
import Web3 from 'web3'
import { ABI } from '../abi'



function App() {
const [web3, setWeb3] = useState(null)
const [fruitsContract, setFruitsContract] = useState(null)
const contractAddress = '0x2900946678bE0c4111C78E1fFa73f669cd21D193'
const [fruit, setFruit] = useState('')
const [blockFruits, setBlockFruits] = useState([]) // this state will store fruits from the smart contract

  useEffect(() => {
    const web3Network = new Web3('http://127.0.0.1:9545')
    setWeb3(web3Network)
    const getAllFruits = new web3Network.eth.Contract(ABI, contractAddress)
    const savedFruits = getAllFruits.methods.getAllFruits().call()
    savedFruits
      .then(result => result && setBlockFruits(result))
  }, [])


  const accounts = async () => {
    return await web3.eth.getAccounts()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
     try {
      const fruitStorageContract = new web3.eth.Contract(ABI, contractAddress)        
       const _account = await accounts()
       await fruitStorageContract.methods.addFruit(fruit).send({from: _account[0]})
      const fruits = await fruitStorageContract.methods.getAllFruits().call()
      setBlockFruits(fruits)
     }catch(e) {
      console.log(e.message)
     }
  }

  // will handle delete
  const handleDelete = async (idx) => {
    try {
     const fruitStorageContract = new web3.eth.Contract(ABI, contractAddress)        
     const _account = await accounts()
     await fruitStorageContract.methods.deleteFruit(idx).send({from: _account[0]})
    }catch(err) {
      console.log(err.message)
    }
  }

return (
    <Container>
      <h2 className='text-center my-3'>Fruits Storage Smart Contract</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Add Fruits Dapp</Form.Label>
          <Form.Control onChange={(e) => setFruit(e.target.value)} value={fruit} type="text" placeholder="Enter a Fruit" />
        </Form.Group>
        <Button variant="primary" className="d-flex justify-center" type="submit">Add</Button>
      </Form>

      <Table striped bordered hover className='mt-3' style={{width: '500px', margin: '0 auto'}}>
      <thead>
        <tr>
          <th>Fruit Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blockFruits.map((fruit, idx) => (
          <tr key={idx}>
            <td>{fruit}</td>
            <td>
              <Button variant='danger' onClick={() => handleDelete(idx)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    </Container>     
  )
}

export default App